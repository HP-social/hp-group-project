import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import './Chat.scss';
import axios from 'axios';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conversation: '',
			wizard: {},
			text: '',
			messages: [],
			user: { email: 'eebravo1@gmail.com', wizard_id: 1 }
		};
	}
	componentDidMount() {
		var config = {
			apiKey: process.env.REACT_APP_APIKEY,
			authDomain: process.env.REACT_APP_AUTHDOMAIN,
			databaseURL: process.env.REACT_APP_DATABASEURL,
			projectId: process.env.REACT_APP_PROJECTID,
			storageBucket: process.env.REACT_APP_STORAGEBUCKET,
			messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
		};
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
		axios
			.get(`/api/wizard/${this.props.match.params.id}`)
			.then((result) =>
				this.setState({ wizard: result.data[0] }, () => this.findConversation())
			);
	}

	onSubmit = (event) => {
		if (event.charCode === 13 && this.state.text.trim() !== '') {
			this.writeMessageToDB(this.state.text);
			this.setState({ text: '' }, () => this.scrollToBottom());
		}
	};
	//.ref(`messages/${this.state.user.wizard_id}to${this.props.match.params.id}`)
	writeMessageToDB = (message) => {
		firebase
			.database()
			.ref(`messages/${this.state.conversation}`)
			.push({
				user: this.props.user.email,
				text: message
			});
	};

  scrollToBottom() {
    this.bottomSpan.scrollIntoView();
  }

  findConversation() {
    if (
      parseInt(this.state.wizard.wizard_id) >
      parseInt(this.props.user.wizard_id)
    ) {
      this.setState(
        {
          conversation: `${this.props.user.wizard_id}to${
            this.state.wizard.wizard_id
          }`
        },
        () => this.getMessages()
      );
    } else {
      this.setState(
        {
          conversation: `${this.state.wizard.wizard_id}to${
            this.props.user.wizard_id
          }`
        },
        () => this.getMessages()
      );
    }
  }

  getMessages = () => {
    var messagesDB = firebase
      .database()
      .ref(`messages/${this.state.conversation}`)
      .limitToLast(500);
    messagesDB.on('value', snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        var message = child.val();
        newMessages.push({
          id: child.key,
          email: message.user,
          text: message.text
        });
      });
      this.setState({ messages: newMessages });
      this.bottomSpan.scrollIntoView({ behavior: 'smooth' });
    });
  };

  renderMessages = () => {
    return this.state.messages.map((message, i) => {
      if (message.email === this.props.user.email) {
        return (
          <div key={i} className='user_outer'>
            <img
              className='avatar'
              alt='avatar'
              src={this.props.user.profile_img}
            />
            <div className='user_message'>{message.text}</div>
            <br />
          </div>
        );
      } else {
        return (
          <div key={i} className='friend_outer'>
            <div className='friend_message'>{message.text}</div>
            <img
              className='avatar'
              alt='avatar'
              src={this.state.wizard.profile_img}
            />
            <br />
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div className='chat'>
        {this.renderMessages()}
        <textarea
          className='chat_input'
          autoFocus={true}
          rowsmax={3}
          placeholder='Type something..'
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
          style={{ width: '98vw', overflow: 'hidden' }}
        />
        <span ref={el => (this.bottomSpan = el)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(mapStateToProps)(Chat);

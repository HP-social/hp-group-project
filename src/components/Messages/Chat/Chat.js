import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Messages from '../Messages';
import './Chat.scss';
import axios from 'axios';
// import HouseHeader from '../../Tools/HouseHeader/HouseHeader';

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

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			axios
				.get(`/api/wizard/${this.props.match.params.id}`)
				.then((result) =>
					this.setState({ wizard: result.data[0] }, () =>
						this.findConversation()
					)
				);
		}
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
		messagesDB.on('value', (snapshot) => {
			let newMessages = [];
			snapshot.forEach((child) => {
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
						{/* <img
              className='avatar'
              alt='avatar'
              src={this.props.user.house}
            /> */}
						<div className={`${this.props.user.house}_color user_message`}>
							{message.text}
						</div>
						<sigil className={this.props.user.house + ' sm'} />
						<br />
					</div>
				);
			} else {
				return (
					<div key={i} className='friend_outer'>
						{/* <HouseHeader house={this.state.wizard.house}>
							{this.state.wizard.username}
						</HouseHeader> */}
						<sigil className={this.state.wizard.house + ' sm'} />
						<div className={`${this.state.wizard.house}_color friend_message`}>
							{message.text}
						</div>
						{/* <img
							className='avatar'
							alt='avatar'
							src={this.state.wizard.profile_img}
						/> */}
						<br />
					</div>
				);
			}
		});
	};

	render() {
		return (
			<div className='chat_envelope'>
				<Messages />
				<div className='chat'>
					{this.renderMessages()}
					<textarea
						className={this.props.user.house + '_color chat_input'}
						autoFocus={true}
						rowsmax={3}
						placeholder='Type something..'
						onChange={(event) => this.setState({ text: event.target.value })}
						value={this.state.text}
						onKeyPress={this.onSubmit}
					/>
					<span ref={(el) => (this.bottomSpan = el)} />
				</div>
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

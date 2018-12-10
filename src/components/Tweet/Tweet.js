import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tweet.scss';
import axios from 'axios';

class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: '',
      forum_id: 0,
      gif: '',
      title: '',
      showGif: false,
      typeInGif: null,
      forum: [],
      selected_forum: 1
    };
  }
  componentDidMount() {
    axios
      .get('/api/forums')
      .then(result => this.setState({ forum: result.data }));
  }

  submitTweet = () => {
    const { post, title, typeInGif, selected_forum } = this.state;
    axios
      .post(`/api/post/:postid`, { post, title, typeInGif, selected_forum })
      .then(results => console.log(results));
  };

  showGif() {
    this.setState({ showGif: !this.state.showGif });
  }

  changeHandler(e, name) {
    this.setState({ [name]: e.target.value });
  }

  render() {
    let options = this.state.forum.map((elem, i) => {
      return (
        <option key={i} value={elem.forum_id}>
          {elem.location}
        </option>
      );
    });
    return (
      <div>
        <div className='confirmWhiteout' />
        <div className='newReview'>
          {/* <h3>{this.props.user.username.toUpperCase()}</h3> */}

          <input
            placeholder='Title'
            type='text'
            className='title'
            onChange={e => this.changeHandler(e, 'title')}
            value={this.state.title}
          />
          <select className='drop_down' name='forum' onChange={(e) => this.changeHandler(e, 'selected_forum')}>{options}</select>
          <textarea
            placeholder='What is on your mind?'
            type='text'
            className={this.state.gif === '' ? 'tweet' : 'tweetWithGif'}
            onChange={e => this.changeHandler(e, 'post')}
            value={this.state.post}
          />
          <div className='reviewButtonContainer'>
            <button
              onClick={() => this.props.newTweetStatus()}
              className='cancelTweet'
            >
              <img src='https://image.flaticon.com/icons/svg/1214/1214428.svg' />
            </button>
            <input
              placeholder='TYPE IN GIF URL'
              value={this.state.typeInGif}
              type='text'
              className={this.state.showGif === true ? 'show_gif' : 'hide_gif'}
              onChange={e => this.changeHandler(e, 'gif')}
            />
            <button onClick={() => this.showGif()} className='submitGif'>
              <img src='https://media.giphy.com/media/12CuGF71hZulOg/giphy.gif' />
            </button>

            <button onClick={() => this.submitTweet()} className='submitTweet'>
              <img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
            </button>
          </div>
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

export default connect(mapStateToProps)(Tweet);
// export default Tweet

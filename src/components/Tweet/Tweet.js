import React, { Component } from "react";
import { connect } from 'react-redux';
import './Tweet.scss';
import axios from 'axios';


 class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: 'Write your tweet here',
      forum_id: 0,
      gif: '',
      title: '',
      showGif: false
    };  
  }


submitTweet() {
    axios
        .post('/api/wizard/tweet', this.state)
        .then(() => this.props.getTweets(parseInt(this.props.tweet_id)));
    this.props.newTweetStatus();
}

changeHandler(e, name) {
    this.setState({ [name]: e.target.value });
}

  render(){
    return (
        <div>
            <div className="confirmWhiteout"/>
            <div className="newReview">
                {/* <h3>{this.props.user.username.toUpperCase()}</h3> */}
                <h3 id='screen_name'>RonStoppable</h3>

                <input
                    placeholder="Title"
                    type="text"
                    className="title"
                    onChange={(e) => this.changeHandler(e,'title')}
                    value={this.state.title}
                />
               
                <textarea
                    placeholder="What is on your mind?"
                    type="text"
                    className={this.state.gif === '' ? "tweet" : "tweetWithGif"}
                    onChange={(e) => this.changeHandler(e,'tweet')}
                    value={this.state.tweet}
                />
                <div className="reviewButtonContainer">
                    <button
                        onClick={() => this.props.newTweetStatus()}
                        className="cancelTweet"
                    >
                        Cancel
                    </button>
                    <input 
                    placeholder='GIF'
                    value = {this.state.gif}
                    type='text'
                    className={this.state.showGif === true ? 'show_gif' : 'hide_gif'}
                    onChange={(e) => this.changeHandler(e, 'gif')}></input>
                    <button
                        onClick={() => this.submitTweet()}
                        className="submitTweet"
                    >
                        Tweet
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
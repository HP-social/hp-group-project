import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Forum.scss';
import Tweet from '../Tweet/Tweet';

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
	  makeATweet: false,
	  user: { email: 'eebravo1@gmail.com', wizard_id: 1 }

    };
  }

  componentDidUpdate () {
	  console.log('hi')
    axios.get(`/api/forum/posts/${this.match.params.id}`).then(results => {
      this.setState({
        post: results.data
      });
      console.log('params');
	});
	
  }

  tweet = () => {
    this.setState({ makeATweet: !this.state.makeATweet });
  };

  render() {
	  console.log(this.props)
	  
    return (
      <div className='poop'>Teeeeeeext
	  <div className='forum_post'></div>
        <button className='tweetButton' onClick={() => this.tweet()}>
          <img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
        </button>
        {this.state.makeATweet === true ? (
          <Tweet newTweetStatus={this.tweet} />
        ) : null}
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

export default connect(
  mapStateToProps,
  { setUser }
)(Forum);

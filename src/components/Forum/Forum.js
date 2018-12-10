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
      user: { email: 'aestesc@gmail.com', wizard_id: 3, username: 'ronstoppable', house: 'slytherin', profile_img: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2016/01/BENH9926-Edit.jpg' }
    };
  }

  componentDidUpdate() {
    console.log('hi');
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
    console.log(this.props);

    return (
      <div className='everything'>
        <h1 className='forum_title'>Slytherin Commons</h1>
        <div className='forum_post'>
          Ron is the best wizard
          <img id='wizard_avi'src={this.state.user.profile_img}></img>
          <div id='wizard_name'>{this.state.user.username}</div>
          <div id='time_of_post'>2 hours ago</div>
          <div id='star-five' />
          <div id='star-five_number'>39</div>
          <div id='comment' />
          <div id ='comment_number'>8</div>
          <div id='triangle' />
        </div>

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

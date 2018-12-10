import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Forum.scss';
import Tweet from '../Tweet/Tweet';
import Card from './Cards/Card';

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      makeATweet: false,
      user: {
        email: 'aestesc@gmail.com',
        wizard_id: 3,
        username: 'ronstoppable',
        house: 'slytherin',
        profile_img:
          'https://d36tnp772eyphs.cloudfront.net/blogs/1/2016/01/BENH9926-Edit.jpg'
      },
      forum: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/forum/${this.props.match.params.id}`).then(result => {
      this.setState({ forum: result.data[0] });
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
        {/* <Tweet /> */}
        <div className='forum_card'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        {/* <Card /> */}
        {/* <div className='forum_post'>
          Ron is the best wizard
          <img id='wizard_avi'src={this.state.user.profile_img}></img>
          <div id='wizard_name'>{this.state.user.username}</div>
          <div id='time_of_post'>2 hours ago</div>
          <div id='star-five' />
          <div id='star-five_number'>39</div>
          <div id='comment' />
          <div id ='comment_number'>8</div>
          <div id='triangle' />
        </div> */}

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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Forum.scss';
import Tweet from '../Tweet/Tweet';
import Card from './Cards/Card';
import HouseHeader from '../Tools/HouseHeader/HouseHeader';

class Forum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			makeATweet: false,
			user: {},
			forum: {}
		};
	}

	componentDidMount = async () => {
		// await axios.get('/api/user').then((result) => {
		// 	if (!result.data.house) {
		// 		this.props.history.push('/sortinghat');
		// 	}
		// });
		await axios
			.get(`/api/forum/${this.props.match.params.id}`)
			.then((result) => {
				this.setState({ forum: result.data[0] });
			});
		await axios
			.get(`/api/forum/posts/${this.props.match.params.id}`)
			.then((results) => {
				this.setState({ posts: results.data });
			});
	};

	tweet = () => {
		this.setState({ makeATweet: !this.state.makeATweet });
	};

	render() {
		let posts = this.state.posts.map((elem, i) => {
			return <Card post={elem} />;
		});
		return (
			<div className='everything'>
				{this.state.forum.location && (
					<HouseHeader house={this.state.forum.location}>
						{this.state.forum.location.toUpperCase()}
					</HouseHeader>
				)}
				{/* <h1 className='forum_title'>{this.state.forum.location}</h1> */}
				{/* <Tweet /> */}
				<div className='card_main'>
					<div className='top_username'>
						<div className='top_left'>
							<sigil className={this.props.user.house + ' sm'} />
							<h3>{this.props.user.username}</h3>
						</div>
					</div>
					<input placeholder='Title' className='title' />
					<textarea className='tweet' placeholder='Text here' />
					<input placeholder='gif link' />
					<button className='cancelTweet'>Cancel</button>
					<>
						<button onClick={() => this.submitTweet()} className='submitTweet'>
							<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
						</button>
						<button>Submit</button>
					</>
				</div>
				<div className='forum_card'>{posts} </div>
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

<<<<<<< HEAD
        <button className='tweetButton' onClick={() => this.tweet()}>
          <img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' alt='tweet button' />
        </button>
        {this.state.makeATweet === true ? (
          <Tweet newTweetStatus={this.tweet} />
        ) : null}
      </div>
    );
  }
=======
				<button className='tweetButton' onClick={() => this.tweet()}>
					<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
				</button>
				{this.state.makeATweet === true ? (
					<Tweet newTweetStatus={this.tweet} />
				) : null}
			</div>
		);
	}
>>>>>>> master
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

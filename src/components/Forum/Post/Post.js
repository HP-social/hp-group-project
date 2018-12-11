import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import axios from 'axios';
import '../../Forum/Forum.scss';
import Tweet from '../../Tweet/Tweet';
import Card from '../Cards/Card';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: [],
			comments: [],
			makeATweet: false,
			comment: ''
		};
	}

	componentDidMount() {
		axios.get(`/api/comments/${this.props.match.params.id}`).then((result) => {
			this.setState({ comments: result.data });
		});
		axios.get(`/api/post/${this.props.match.params.id}`).then((results) => {
			this.setState({ post: results.data });
		});
	}

	tweet = () => {
		this.setState({ makeATweet: !this.state.makeATweet });
	};

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	render() {
		let post = this.state.post.map((elem, i) => {
			return <Card post={elem} />;
		});
		let comments = this.state.comments.map((elem, i) => {
			return <Card post={elem} />;
		});
		return (
			<div className='everything'>
				{this.state.post[0] && (
					<HouseHeader house={this.state.post[0].location}>
						{this.state.post[0].location.toUpperCase()}
					</HouseHeader>
				)}
				<div className='forum_card'>{post} </div>
				<div className='new_post_main'>
					<div className='new_username'>
						<div className='top_left'>
							<sigil className={this.props.user.house + ' sm'} />
							<h3>{this.props.user.username}</h3>
						</div>
					</div>
					<textarea
						onChange={(e) => this.changeHandler(e, 'post')}
						className='new_tweet'
						placeholder='Text here'
					/>
					<div className='new_buttons'>
						<button onClick={() => this.submitTweet()} className='submitTweet'>
							<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
						</button>
					</div>
					<div className='forum_card'>{comments} </div>
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
)(Post);

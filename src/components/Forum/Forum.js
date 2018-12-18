import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Forum.scss';
import Tweet from '../Tweet/Tweet';
import Card from './Cards/Card';
import HouseHeader from '../Tools/HouseHeader/HouseHeader';
import Snitch from '../../components/Snitch/Snitch';
class Forum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			makeATweet: false,
			user: {},
			forum: {},
			title: '',
			gif: '',
			post: '',
			isSubbed: false
		};
		this.setPosts = this.setPosts.bind(this);
		this.subToggle = this.subToggle.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.setForum();
		}
	}

	componentDidMount = async () => {
		this.setForum();
	};

	subToggle() {
		if (this.state.isSubbed) {
			axios
				.delete(`/api/deletesubscription/${this.props.match.params.id}`)
				.then(() => this.setState({ isSubbed: !this.state.isSubbed }));
		} else {
			axios
				.post(`/api/addsubscription/${this.props.match.params.id}`)
				.then(() => this.setState({ isSubbed: !this.state.isSubbed }));
		}
	}

	setForum = async () => {
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
		await axios
			.get(`/api/issubscribed/${this.props.match.params.id}`)
			.then((result) => {
				if (result.data.length > 0) {
					this.setState({ isSubbed: true });
				}
			});
	};

	tweet = () => {
		this.setState({ makeATweet: !this.state.makeATweet });
	};
	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}
	cleanState() {
		this.setState({ gif: '', title: '', post: '' });
	}

	setPosts() {
		axios
			.get(`/api/forum/posts/${this.props.match.params.id}`)
			.then((results) => {
				this.setState({ posts: results.data }, () => this.cleanState());
			});
	}

	newPost() {
		let newPost = Object.assign(
			{},
			{
				title: this.state.title,
				gif: this.state.gif,
				post: this.state.post,
				wizard_id: this.props.user.wizard_id,
				forum_id: this.state.forum.forum_id
			}
		);
		axios.post('/api/post', newPost).then(() => this.setPosts());
	}
	render() {
		let posts = this.state.posts.map((elem, i) => {
			return <Card setPosts={this.setPosts} post={elem} />;
		});
		return (
			<div className='everything'>
				{/* <>
				<div className='confirmWhiteout' /><> */}
				{this.state.forum.location && (
					<HouseHeader
						house={this.state.forum.location}
						isSubbed={this.state.isSubbed}
						subToggle={this.subToggle}
					>
						{this.state.forum.location.toUpperCase()}
					</HouseHeader>
				)}
				{/* <h1 className='forum_title'>{this.state.forum.location}</h1> */}
				{/* <Tweet /> */}
				<div className='new_post_main'>
					<div className='new_username'>
						<div className='top_left'>
							<sigil className={this.props.user.house + ' sm'} />
							<h3>{this.props.user.username}</h3>
						</div>
					</div>
					<Snitch />
					<input
						onChange={(e) => this.changeHandler(e, 'title')}
						placeholder='Title'
						className='new_title'
						value={this.state.title}
					/>
					{this.state.gif.length > 1 && (
						<img className='gif' src={this.state.gif} alt='currentGif' />
					)}
					<textarea
						onChange={(e) => this.changeHandler(e, 'post')}
						className='new_tweet'
						placeholder='Text here'
						value={this.state.post}
					/>
					<input
						className='gif_input'
						onChange={(e) => this.changeHandler(e, 'gif')}
						placeholder='gif link'
						value={this.state.gif}
					/>
					<div className='new_buttons'>
						<button onClick={() => this.newPost()} className='submitTweet'>
							<img
								src='https://image.flaticon.com/icons/svg/1305/1305386.svg'
								alt='submit'
							/>
						</button>
					</div>
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
				<button
					className={this.props.user.house + '_color tweetButton'}
					onClick={() => this.tweet()}
				>
					<img
						src='https://image.flaticon.com/icons/svg/1305/1305386.svg'
						alt='house'
					/>
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

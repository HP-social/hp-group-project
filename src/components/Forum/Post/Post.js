import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import axios from 'axios';
import '../../Forum/Forum.scss';
import Tweet from '../../Tweet/Tweet';
import Card from '../Cards/Card';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import Comment from '../Cards/Comment';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: [],
			comments: [],
			makeATweet: false,
			comment: ''
		};
		this.setComments = this.setComments.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/comment/${this.props.match.params.id}`).then((result) => {
			this.setState({ comments: result.data });
		});
		axios.get(`/api/post/${this.props.match.params.id}`).then((results) => {
			this.setState({ post: results.data });
		});
	}

	tweet = () => {
		this.setState({ makeATweet: !this.state.makeATweet });
	};

	cleanState() {
		this.setState({ comment: '' });
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	setComments() {
		axios
			.get(`/api/comment/${this.props.match.params.id}`)
			.then((result) =>
				this.setState({ comments: result.data }, () => this.cleanState())
			);
	}

	newPost() {
		let newPost = Object.assign(
			{},
			{
				comment: this.state.comment,
				wizard_id: this.props.user.wizard_id,
				post_id: this.state.post[0].post_id
			}
		);
		axios.post('/api/comment', newPost).then(() => this.setComments());
	}

	render() {
		let post = this.state.post.map((elem, i) => {
			return <Card post={elem} />;
		});
		let comments = this.state.comments.map((elem, i) => {
			return <Comment setComments={this.setComments} post={elem} />;
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
						onChange={(e) => this.changeHandler(e, 'comment')}
						className='new_tweet'
						placeholder='Text here'
						value={this.state.comment}
					/>
					<div className='new_buttons'>
						<button onClick={() => this.newPost()} className='submitTweet'>
							<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
						</button>
					</div>
					<div className='forum_card'>{comments} </div>
				</div>
				<button
					className={this.props.user.house + '_color tweetButton'}
					onClick={() => this.tweet()}
				>
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

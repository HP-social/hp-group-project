import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';
import './Card.scss';
import '../Forum.scss';
import moment from 'moment';
import axios from 'axios';
class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLiked: false,
			isBookmarked: false,
			likeNumber: 0,
			commentNumber: 0,
			className: 'hidden-class',
			title: '',
			newPost: '',
			gif: '',
			edit: false
		};
	}

	componentDidMount() {
		axios.get(`/api/isliked/${this.props.post.post_id}`).then((result) => {
			if (result.data.length > 0) {
				this.setState({ isLiked: true });
			}
		});
		axios.get(`/api/isBookmarked/${this.props.post.post_id}`).then((result) => {
			if (result.data.length > 0) {
				this.setState({ isBookmarked: true });
			}
		});
		// this.setState({ likeNumber: this.props.post.likes });
		// axios
		// 	.get(`/api/post/${this.props.post_id}`)
		// 	.then((result) => this.setState({ post: result.data }));
		// axios
		// 	.get(`/api/likes/${this.props.post_id}`)
		// 	.then((result) => this.setState({ likeNumber: result.data }));
		// axios
		// 	.get(`/api/comments/${this.props.post_id}`)
		// 	.then((result) => this.setState({ commentNumber: result.data }));
	}

	editChanger() {
		if (this.props.user.wizard_id == this.props.post.wizard_id) {
			this.setState({ edit: !this.state.edit }, () =>
				this.setState({
					title: this.props.post.title,
					newPost: this.props.post.post,
					gif: this.props.post.gif
				})
			);
		}
	}

	bookmark() {
		if (this.state.isBookmarked) {
			axios
				.delete(`/api/deletebookmark/${this.props.post.post_id}`)
				.then(() => this.setState({ isBookmarked: !this.state.isBookmarked }));
		} else if (!this.state.isBookmarked) {
			axios
				.post(`/api/addbookmark/${this.props.post.post_id}`)
				.then(() => this.setState({ isBookmarked: !this.state.isBookmarked }));
		}
	}

	like() {
		if (this.state.isLiked) {
			axios
				.delete(`/api/deletepostlike/${this.props.post.post_id}`)
				.then(() => this.setState({ isLiked: !this.state.isLiked }));
		} else if (!this.state.isLiked) {
			axios
				.post(`/api/addpostlike/${this.props.post.post_id}`)
				.then(() => this.setState({ isLiked: !this.state.isLiked }));
		}
	}

	posted() {
		this.editChanger();
		this.props.setPosts();
	}

	updatePost() {
		let updatedPost = Object.assign(
			{},
			{
				wizard_id: this.props.user.wizard_id,
				forum_id: this.props.post.forum_id,
				post_id: this.props.post.post_id,
				post: this.state.newPost,
				title: this.state.title,
				gif: this.state.gif
			}
		);
		axios
			.put(`/api/post/${this.props.post.post_id}`, updatedPost)
			.then(() => this.posted());
	}

	hide() {
		if (this.state.className === 'hidden-class') {
			this.setState({ className: 'expandable-body' });
		} else {
			this.setState({ className: 'hidden-class' });
		}
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	render() {
		let timeNow = moment();
		let postTime = moment(this.props.post.time);
		let duration = timeNow.diff(postTime, 'hours');

		const bottomIcon = [
			'https://image.flaticon.com/icons/svg/149/149217.svg',
			'https://image.flaticon.com/icons/svg/134/134797.svg',
			'https://image.flaticon.com/icons/svg/1174/1174410.svg'
		];

		const bottomDiv = [
			'Likes',
			<Link to={`/post/${this.props.post.post_id}`}>'Comments'</Link>,
			'Bookmarks'
		].map((e, i) => {
			return (
				<div className='card' key={i}>
					<img
						className={
							this.state.isLiked ? this.props.user.house + 'Selected' : 'fun'
						}
						src={bottomIcon[i]}
						alt='icons'
					/>
					<h3>{e}</h3>
				</div>
			);
		});

		const editCard = [this.props.post].map((e, i) => {
			return (
				<>
					<div className='card_main' key={i}>
						<div className={e.house + '_top_bottom' + ' top_username'}>
							<div className='top_left'>
								<sigil className={e.house + ' sm'} />
								<h3>{e.username}</h3>
							</div>

							<div className='top_right'>
								<h3>
									<img
										src='https://image.flaticon.com/icons/svg/66/66163.svg'
										alt='icons'
									/>
									{duration} Hours Ago
								</h3>
							</div>
						</div>
						<input
							onChange={(e) => this.changeHandler(e, 'title')}
							placeholder='Title'
							className='new_title'
							value={this.state.title}
						/>
						<div className='media_container'>
							{e.gif === null || e.gif === '' ? null : (
								<img onClick={() => this.hide()} src={e.gif} alt='icons' />
							)}
						</div>
						<textarea
							onChange={(e) => this.changeHandler(e, 'newPost')}
							className='new_tweet'
							placeholder='Text here'
							value={this.state.newPost}
						/>
						<input
							className='gif_input'
							onChange={(e) => this.changeHandler(e, 'gif')}
							placeholder='gif link'
							value={this.state.gif}
						/>
						<div className={e.house + '_top_bottom' + ' bottom_container'}>
							<div className='reviewButtonContainer'>
								<button
									onClick={() => this.editChanger()}
									className='cancelTweet'
								>
									<img
										src='https://image.flaticon.com/icons/svg/1214/1214428.svg'
										alt='cancel post'
									/>
								</button>
								<button
									onClick={() => this.updatePost()}
									className='submitTweet'
								>
									<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
								</button>
							</div>
						</div>
					</div>
				</>
			);
		});

		const dynamicCard = [this.props.post].map((e, i) => {
			return (
				<>
					<div className='card_main' key={i}>
						<div
							onClick={() => this.editChanger()}
							className={e.house + '_top_bottom' + ' top_username'}
						>
							<Link to={`/profile/${e.wizard_id}`}>
								<div className='top_left'>
									<sigil className={e.house + ' sm'} />
									<h3>{e.username}</h3>
								</div>
							</Link>
							<div className='top_right'>
								<h3>
									<img
										src='https://image.flaticon.com/icons/svg/66/66163.svg'
										alt='icons'
									/>
									{duration} Hours Ago
								</h3>
							</div>
						</div>
						<div className='mid_title' onClick={() => this.hide()}>
							{e.title}
						</div>
						<div className='media_container'>
							{e.gif === null || e.gif === '' ? null : (
								<img onClick={() => this.hide()} src={e.gif} alt='icons' />
							)}
						</div>
						<div className={this.state.className}>
							<div className='text_area'>{e.post}</div>
						</div>
						<div className={e.house + '_top_bottom' + ' bottom_container'}>
							<div className='card' key={i}>
								<img
									onClick={() => this.like()}
									id='star'
									className={this.state.isLiked && e.house + '_Selected'}
									src='https://s3.us-east-2.amazonaws.com/hpsocial/baseline-star_rate-18px.svg'
									alt='icons'
								/>
							</div>
							<div className='card' key={i}>
								<Link to={`/post/${this.props.post.post_id}`}>
									<img
										src='https://s3.us-east-2.amazonaws.com/hpsocial/baseline-comment-24px.svg'
										alt='icons'
									/>
								</Link>
							</div>
							<div className='card' key={i}>
								<img
									onClick={() => this.bookmark()}
									className={this.state.isBookmarked && e.house + '_Selected'}
									src='https://s3.us-east-2.amazonaws.com/hpsocial/baseline-bookmark-24px.svg'
									alt='icons'
								/>
							</div>
						</div>
					</div>
				</>
			);
		});
		if (!this.state.edit) {
			return (
				<>
					<>{dynamicCard}</>
				</>
			);
		} else if (this.state.edit) {
			return <>{editCard}</>;
		}
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
)(Card);

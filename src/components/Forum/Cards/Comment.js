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
			edit: false,
			comment: ''
		};
	}

	componentDidMount() {
		// axios.get(`/api/isLiked/${this.props.post_id}`).then((result) => {
		// 	if (result.data.length > 0) {
		// 		this.setState({ isLiked: true });
		// 	}
		// });
		// axios.get(`/api/isBookmarked/${this.props.post_id}`).then((result) => {
		// 	if (result.data.length > 0) {
		// 		this.setState({ isBookmarked: true });
		// 	}
		// });
		axios
			.get(`/api/post/${this.props.post_id}`)
			.then((result) => this.setState({ post: result.data }));
		// axios
		// 	.get(`/api/likes/${this.props.post_id}`)
		// 	.then((result) => this.setState({ likeNumber: result.data }));
		axios
			.get(`/api/comments/${this.props.post_id}`)
			.then((result) => this.setState({ commentNumber: result.data }));
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}
	editChanger() {
		if (this.props.user.wizard_id == this.props.post.wizard_id) {
			this.setState({ edit: !this.state.edit }, () =>
				this.setState({ comment: this.props.post.comment })
			);
		}
	}

	posted() {
		this.editChanger();
		this.props.setComments();
	}

	updatePost() {
		let updatedPost = Object.assign(
			{},
			{
				comment: this.state.comment,
				wizard_id: this.props.user.wizard_id,
				comment_id: this.props.post.comment_id,
				post_id: this.props.post.post_id
			}
		);
		axios
			.put(`/api/comment/${this.props.post.comment_id}`, updatedPost)
			.then(() => this.posted());
	}

	render() {
		let timeNow = moment();
		let postTime = moment(this.props.post.time);
		let duration = timeNow.diff(postTime, 'hours');

		const bottomIcon = [
			'https://image.flaticon.com/icons/svg/149/149217.svg',
			'https://image.flaticon.com/icons/svg/1174/1174410.svg'
		];

		const bottomDiv = ['Likes', 'Bookmarks'].map((e, i) => {
			return (
				<div className='card' key={i}>
					<img src={bottomIcon[i]} alt='icons' />
					<h3>{e}</h3>
				</div>
			);
		});

		const editCard = [this.props.post].map((e, i) => {
			return (
				<>
					<div className='card_main' key={i}>
						<div
							onClick={() => this.editChanger()}
							className={e.house + '_top_bottom' + ' top_username'}
						>
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
						<div className='mid_title'>{e.title}</div>
						<textarea
							onChange={(e) => this.changeHandler(e, 'comment')}
							className='new_tweet'
							placeholder='Text here'
							value={this.state.comment}
						/>
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
							<button onClick={() => this.updatePost()} className='submitTweet'>
								<img src='https://image.flaticon.com/icons/svg/1305/1305386.svg' />
							</button>
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
						<div className='mid_title' onClick={() => this.hide()}>
							{e.title}
							{/* <div className='triangle' /> */}
						</div>

						<div className='text_area'>{e.comment}</div>
						<div className='bottom_container'>{bottomDiv}</div>
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
			return (
				<>
					<>{editCard}</>
				</>
			);
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

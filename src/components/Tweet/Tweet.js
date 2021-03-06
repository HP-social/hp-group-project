import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tweet.scss';
import axios from 'axios';

class Tweet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: '',
			forum_id: 1,
			gif: '',
			title: '',
			showGif: false,
			typeInGif: null,
			forum: []
		};
	}
	componentDidMount() {
		axios
			.get('/api/forums')
			.then((result) => this.setState({ forum: result.data }));
	}

	submitTweet = () => {
		const { post, title, gif, forum_id } = this.state;

		let newPost = Object.assign(
			{},
			{ post, title, gif, forum_id },
			{ wizard_id: this.props.user.wizard_id }
		);
		axios.post(`/api/post/`, newPost).then((results) => console.log(results));
	};

	showGif() {
		this.setState({ showGif: !this.state.showGif });
	}

	changeHandler(e, name) {
		this.setState({ [name]: e.target.value });
	}

	render() {
		let options = this.state.forum.map((elem, i) => {
			return (
				<option key={i} value={elem.forum_id}>
					{elem.location}
				</option>
			);
		});
		return (
			<div>
				<div className='confirmWhiteout' />
				<div className={this.props.user.house + '_color newReview'}>
					{/* <h3>{this.props.user.username.toUpperCase()}</h3> */}

					<input
						placeholder='Title'
						type='text'
						className={this.props.user.house + '_secondary_color title'}
						onChange={(e) => this.changeHandler(e, 'title')}
						value={this.state.title}
					/>
					<select
						className={this.props.user.house + '_secondary_color drop_down'}
						name='forum'
						onChange={(e) => this.changeHandler(e, 'forum_id')}
					>
						{options}
					</select>
					{this.state.gif.length > 5 && (
						<img alt='chosenGif' src={this.state.gif} />
					)}
					<textarea
						placeholder='What is on your mind?'
						type='text'
						className={this.props.user.house + '_secondary_color tweet'}
						onChange={(e) => this.changeHandler(e, 'post')}
						value={this.state.post}
					/>
					<div className='reviewButtonContainer'>
						<button
							onClick={() => this.props.newTweetStatus()}
							className='cancelTweet'
						>
							<img
								src='https://image.flaticon.com/icons/svg/1214/1214428.svg'
								alt='cancel post'
							/>
						</button>
						<input
							placeholder='TYPE IN GIF URL'
							value={this.state.typeInGif}
							type='text'
							className={
								this.state.showGif === true
									? this.props.user.house + '_secondary_color show_gif'
									: 'hide_gif'
							}
							onChange={(e) => this.changeHandler(e, 'gif')}
						/>
						<button onClick={() => this.showGif()} className='submitGif'>
							<img
								src='https://media.giphy.com/media/12CuGF71hZulOg/giphy.gif'
								alt='show gif input'
							/>
						</button>

						<button
							onClick={() => this.submitTweet()}
							className={this.props.user.house + '_secondary_color submitTweet'}
						>
							<img
								src='https://image.flaticon.com/icons/svg/1305/1305386.svg'
								alt='send post'
							/>
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

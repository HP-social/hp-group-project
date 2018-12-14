import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '../../Forum/Cards/Card';
import Comment from '../../Forum/Cards/Comment';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import './Mentions.scss';

class Mentions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postMentions: [],
			commentMentions: [],
			posts: true
		};
	}

	componentDidMount() {
		this.postMentions();
		this.commentMentions();
	}

	changeMention(bool) {
		this.setState({ posts: bool });
	}

	postMentions() {
		axios
			.get(`/api/postmentions?input=${this.props.user.username}`)
			.then((result) => this.setState({ postMentions: result.data }));
	}
	commentMentions() {
		axios
			.get(`/api/commentmentions?input=${this.props.user.username}`)
			.then((result) => this.setState({ commentMentions: result.data }));
	}

	render() {
		let posts = this.state.postMentions.map((post) => <Card post={post} />);
		let comments = this.state.commentMentions.map((comment) => (
			<Comment post={comment} />
		));
		return (
			<div className='fav'>
				<HouseHeader house={this.props.user.house}>Mentions</HouseHeader>
				<div className={this.props.user.house + 'Back mention_header'}>
					<div
						onClick={() => this.changeMention(true)}
						className={
							this.state.posts ? this.props.user.house + 'Words' : 'Words'
						}
					>
						Posts
					</div>
					<div
						onClick={() => this.changeMention(false)}
						className={
							!this.state.posts ? this.props.user.house + 'Words' : 'Words'
						}
					>
						Comments
					</div>
				</div>
				{this.state.posts ? posts : comments}
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

export default connect(mapStateToProps)(Mentions);

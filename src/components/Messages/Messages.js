import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Messages extends Component {
	constructor() {
		super();
		this.state = {
			friends: []
		};
	}
	componentDidMount() {
		axios
			.get(`/api/message/allfriends/${this.props.user.wizard_id}`)
			.then((result) => this.setState({ friends: result.data }));
	}

	render() {
		let friends = this.state.friends.map((friend, i) => (
			<Link key={i} to={`/messages/${friend.followed_id}`}>
				<div className='message_friend'>
					<img
						className='avatar'
						alt={friend.username}
						src={friend.profile_img}
					/>
					{friend.username}
				</div>
			</Link>
		));
		return <div className='message_container'>{friends}</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Messages);

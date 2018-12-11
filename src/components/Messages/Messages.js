import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../ducks/reducer';
import './Messages.scss';
import axios from 'axios';

class Messages extends Component {
	constructor(props) {
		super(props);
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
			<Link key={i} to={`/chat/${friend.followed_id}`}>
				<div className='message_friend'>
					<sigil className={friend.house + ' sm'} />
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

export default connect(
	mapStateToProps,
	{ setUser }
)(Messages);

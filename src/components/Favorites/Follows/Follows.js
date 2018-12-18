import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '../../Forum/Cards/Card';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';

class Follows extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		this.getFollows();
	}
	getFollows() {
		axios
			.get(`/api/followed/${this.props.user.wizard_id}`)
			.then((result) => this.setState({ posts: result.data }));
	}

	render() {
		let follows = this.state.posts.map((post) => <Card post={post} />);
		return (
			// <div className='fav'>
			<div className='everything'>
				<HouseHeader noButton='nope' house={this.props.user.house}>
					follows
				</HouseHeader>
				{follows}
			</div>
			// </div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Follows);

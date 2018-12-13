import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import axios from 'axios';
import Card from '../../Forum/Cards/Card';

class Bookmarks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookmarks: []
		};
	}

	componentDidMount() {
		this.setBookmarks();
	}

	setBookmarks() {
		axios
			.get(`/api/bookmarks/${this.props.user.wizard_id}`)
			.then((result) => this.setState({ bookmarks: result.data }));
	}

	render() {
		let bookmarks = this.state.bookmarks.map((post) => <Card post={post} />);
		return (
			<div>
				<HouseHeader house={this.props.user.house}>Bookmarks</HouseHeader>
				{bookmarks}
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

export default connect(mapStateToProps)(Bookmarks);

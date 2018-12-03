import React, { Component } from 'react';
import { connect } from 'react-redux';

class Bookmarks extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Bookmarks</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Bookmarks);

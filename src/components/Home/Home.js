import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Home</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Home);

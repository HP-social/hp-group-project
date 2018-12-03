import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';

class Navigation extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Navigation</div>;
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
)(Navigation);

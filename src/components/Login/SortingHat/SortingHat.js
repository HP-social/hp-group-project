import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';

class SortingHat extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>SortingHat</div>;
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
)(SortingHat);

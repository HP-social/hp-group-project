import React, { Component } from 'react';
import { connect } from 'react-redux';

class Subscriptions extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Subscriptions</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Subscriptions);

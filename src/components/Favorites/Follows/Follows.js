import React, { Component } from 'react';
import { connect } from 'react-redux';

class Follows extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Follows</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Follows);

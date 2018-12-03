import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mentions extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>Mentions</div>;
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Mentions);

import React from 'react';
import { connect } from 'react-redux';

function Tutorial() {
	return <div>Tutorial</div>;
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Tutorial);

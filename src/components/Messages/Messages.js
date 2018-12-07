import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import HouseHeader from '../Tools/HouseHeader/HouseHeader';

class Messages extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div>
				<HouseHeader house={'ravenclaw'} />
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

export default connect(
	mapStateToProps,
	{ setUser }
)(Messages);

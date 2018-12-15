import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subscriptions.scss';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import axios from 'axios';

class Subscriptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subscriptions: []
		};
	}

	componentDidMount() {
		this.getSubs();
	}

	getSubs = () => {
		axios
			.get(`/api/subscriptions/${this.props.user.wizard_id}`)
			.then((res) => this.setState({ subscriptions: res.data }));
	};

	deleteSubscription = (id) => {
		axios.delete(`/api/deletesubscription/${id}`).then(() => this.getSubs());
	};

	render() {
		let subsCards = this.state.subscriptions.map((e, i) => {
			return (
				<div className='subs_contents' key={i}>
					<div>
						<h1>{e.location}</h1>
					</div>
					<div className='inside_right'>
						<img
							onClick={() => this.deleteSubscription(e.forum_id)}
							src='https://s3.amazonaws.com/hp-project/unsubscribe24px.svg'
							alt='unsubscribe'
						/>
					</div>
				</div>
			);
		});

		return (
			<>
				<HouseHeader noButton='nope' house={''}>
					Subscriptions
				</HouseHeader>
				<div className='sub_outer' />
				<div className='subs_main'>{subsCards} </div>
			</>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}

export default connect(mapStateToProps)(Subscriptions);

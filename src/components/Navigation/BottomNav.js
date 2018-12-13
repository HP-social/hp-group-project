import React, { Component } from 'react';
import './Navigation.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BottomNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			path: ''
		};
	}

	updatePath(selected) {
		this.setState({ path: selected });
	}

	render() {
		return (
			<div className={this.props.user.house + '_secondary_color selector'}>
				<Link to='/dailyprophet'>
					<img
						onClick={() => this.updatePath('dailyprophet')}
						src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-library_books-24px.svg'
						alt='icon'
						className={
							this.state.path.includes('dailyprophet')
								? this.props.user.house + 'Selected'
								: this.props.user.house + 'Icon'
						}
					/>
				</Link>
				<Link to='/messages'>
					<img
						onClick={() => this.updatePath('message')}
						src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-mail-24px.svg'
						alt='icon'
						className={
							this.state.path.includes('message')
								? this.props.user.house + 'Selected'
								: this.props.user.house + 'Icon'
						}
					/>
				</Link>
				<Link to='/thequibbler'>
					<img
						onClick={() => this.updatePath('quibbler')}
						src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-notifications-24px.svg'
						alt='icon'
						className={
							this.state.path.includes('quibbler')
								? this.props.user.house + 'Selected'
								: this.props.user.house + 'Icon'
						}
					/>
				</Link>
				<img
					onClick={() =>
						(window.location.href = `${
							process.env.REACT_APP_SERVER
						}/api/logout`)
					}
					src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-remove_circle-24px.svg'
					alt='icon'
					className={
						window.location.pathname.includes('logout')
							? this.props.user.house + 'Selected'
							: this.props.user.house + 'Icon'
					}
				/>
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
export default connect(mapStateToProps)(BottomNav);

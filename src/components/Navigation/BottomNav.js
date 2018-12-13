import React from 'react';
import './Navigation.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function BottomNav(props) {
	return (
		<div className={props.user.house + '_secondary_color selector'}>
			<Link to='/dailyprophet'>
				<img
					src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-library_books-24px.svg'
					alt='icon'
					className={props.user.house + 'Icon'}
				/>
			</Link>
			<Link to='/messages'>
				<img
					src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-mail-24px.svg'
					alt='icon'
					className={props.user.house + 'Icon'}
				/>
			</Link>
			<Link to='/thequibbler'>
				<img
					src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-notifications-24px.svg'
					alt='icon'
					className={props.user.house + 'Icon'}
				/>
			</Link>
			<img
				onClick={() =>
					(window.location.href = `${process.env.REACT_APP_SERVER}/api/logout`)
				}
				src='https://s3.us-east-2.amazonaws.com/hpsocial/outline-remove_circle-24px.svg'
				alt='icon'
				className={props.user.house + 'Icon'}
			/>
		</div>
	);
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}
export default connect(mapStateToProps)(BottomNav);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subscriptions.scss';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';

class Subscriptions extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className='subs_main'>
        <HouseHeader house={''}>Subscriptions</HouseHeader>
				<h1>hello</h1>
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

export default connect(mapStateToProps)(Subscriptions);

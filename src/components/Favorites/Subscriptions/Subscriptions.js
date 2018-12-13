import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Subscriptions.scss';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import axios from 'axios';

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [
        // {
        //   forum_id: 9,
        //   wizard_id: 2,
        //   location: 'dumbledores office',
        //   description: null,
        //   img: null,
        //   private: true,
        //   on_map: true
        // },
        // {
        //   forum_id: 6,
        //   wizard_id: 2,
        //   location: 'chamber of secrets',
        //   description: null,
        //   img: null,
        //   private: true,
        //   on_map: false
        // },
        // {
        //   forum_id: 13,
        //   wizard_id: 2,
        //   location: 'hogsmead',
        //   description: null,
        //   img: null,
        //   private: false,
        //   on_map: false
        // }

        // /api/deletesubscrition/${e.forum_id}
        // /api/deletesubscrition
      ]
    };
  }

  componentDidMount() {
    axios
      .get(`/api/subscriptions/${this.props.user.wizard_id}`)
      .then(res => this.setState({ subscriptions: res.data }));
  }

  deleteSubscription = () => {
    axios.delete(`api/`)
  }

  render() {
    let subsCards = this.state.subscriptions.map((e, i) => {
      return (
        <div className='subs_contents' key={i}>
          <div>
            <h1>{e.location}</h1>
          </div>
          <div className='inside_right'>
            <img
              src='https://s3.amazonaws.com/hp-project/unsubscribe24px.svg'
              alt='unsubscribe'
            />
          </div>
        </div>
      );
    });

    return (
      <>
        <HouseHeader house={''}>Subscriptions</HouseHeader>
        <div className='sub_outer' />
        <div className='subs_main'>{subsCards}</div>
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

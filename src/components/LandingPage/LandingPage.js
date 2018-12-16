import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import './LandingPage.scss';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  loginRedirect = () => {
    window.location.href = `${process.env.REACT_APP_SERVER}/login`;
  };
  render() {
    const icon = [
      'https://image.flaticon.com/icons/svg/859/859170.svg',
      'https://image.flaticon.com/icons/svg/784/784629.svg',
      'https://image.flaticon.com/icons/svg/149/149054.svg'
    ];
    const text = [
      'Find Your Noble House',
      'Interact In Public & Private Communities',
      'Discover Adventure Throughout Hogwarts!'
    ];
    const cardTitle = ['Houses', 'Communities', 'Explore'].map((e, i) => {
      return (
        <div className='card' key={i}>
          <>
            <img src={icon[i]} alt='oops' />
          </>
          <>
            <h1>{e}</h1>
          </>
          <>
            <p>{text[i]}</p>
          </>
        </div>
      );
    });
    return (
      <div className='main_landing'>
        <div class='photo_before'>
          <a href='#WelcomeWizards'>
            <h1>Welcome Muggles</h1>
          </a>
          <section class='example example--2'>
            <span class='scroll-icon'>
              <span class='scroll-icon__dot' />
            </span>
          </section>
        </div>
        <div class='photo_after'>
          <h1 id='WelcomeWizards'>Welcome Wizards</h1>
        </div>
        <div className='mid_container'>{cardTitle}</div>
        <div className='bottom_container'>
          <h1 onClick={() => this.loginRedirect()}>Start</h1>
        </div>
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
)(LandingPage);

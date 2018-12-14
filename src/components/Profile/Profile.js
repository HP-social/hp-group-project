import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        wizard_id: 1,
        email: 'eebravo1@gmail.com',
        username: 'patientzero',
        house: 'ravenclaw',
        role: 'student'
      },
      house_points: null,
      default_message: 'Enter New Passphrase...',
      houseStudents: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/wizard/${this.props.match.params.id}`)
      .then(results => this.setState({ userInfo: results.data[0] }));
    axios
      .get('/api/getauxpoints')
      .then(results => this.setState({ house_points: results.data }));
  }

  sendNewPassword = async () => {
    const { default_message } = this.state;
    await axios
      .get(`/api/emails?house=${this.state.userInfo.house}`)
      .then(res =>
        this.setState({
          houseStudents: res.data.map(email => {
            return email.email;
          })
        })
      );
    await axios.post('/api/sendEmail1', {
      passphrase: default_message,
      houseStudents: this.state.houseStudents.join(', ')
    });
  };

  render() {
    let cards = ['One', 'Two', 'Three'].map((e, i) => {
      return (
        <div key={i} className='card'>
          Title: {e}
        </div>
      );
    });
    let amount_of_points =
      this.state.house_points &&
      this.state.house_points
        .filter(elem => {
          return elem.house.includes(this.state.userInfo.house);
        })
        .map((elem, i) => {
          return (
            <div id='each_house' key={i}>
              {elem.sum}
            </div>
          );
        });
    return (
      <div className='profile_container'>
        <div className='inner_div_left'>
          <div className='top_left'>
            <>
              <sigil className={this.props.user.house + ' sm'} />
            </>
            <>
              <div className='top_right'>
                <h1>{this.state.userInfo.username}</h1>
                <div className='bottom_right'>
                  <h3>Followers {this.props.followingYou.count}</h3>
                  <h3>&#9899;</h3>
                  <h3>Following {this.props.youFollow.count} </h3>
                </div>
              </div>
            </>
          </div>
          <br />
          <div className='points_box'>
            <h3>House Points:</h3>
            <h3
              id={
                this.state.userInfo.house === 'gryffindor'
                  ? 'gryffindorText'
                  : this.state.userInfo.house === 'ravenclaw'
                  ? 'ravenclawText'
                  : this.state.userInfo.house === 'slytherin'
                  ? 'slytherinText'
                  : this.state.userInfo.house === 'hufflepuff'
                  ? 'hufflepuffText'
                  : null
              }
            >
              {amount_of_points}
            </h3>
          </div>
          <br />
          <div className='bottom'>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/149/149071.svg'}
                alt='user icon'
              />
              <h2>ROLE: {this.state.userInfo.role.toUpperCase()}</h2>
            </div>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/859/859170.svg'}
                alt='house logo'
              />
              <h2>HOUSE: {this.state.userInfo.house.toUpperCase()}</h2>
            </div>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/281/281769.svg'}
                alt='email icon'
              />
              <h2>EMAIL: {this.state.userInfo.email.toUpperCase()}</h2>
            </div>
          </div>
          <br />
          {this.state.userInfo.role !== 'student' && (
            <div className='admin_controls'>
              <h1>Change House Passphrase</h1>
              <br />
              <div className='admin_bottom'>
                <input
                  placeholder={this.state.default_message}
                  onChange={e =>
                    this.setState({ default_message: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    this.sendNewPassword();
                  }}
                >
                  Send Email
                </button>
              </div>
            </div>
          )}
          <div />
        </div>
        <div className='inner_div_right'>
          <div className='right_bookmarks'>
            <h1>Bookmarks</h1>
          </div>
          <div className='bookmarks_bottom'>
            <>{cards}</>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, youFollow, followingYou } = state;
  return {
    user,
    youFollow,
    followingYou
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Profile);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import axios from 'axios';
import './Profile.scss';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      default_message: 'Enter New Passphrase...'
    };
  }

  componentDidMount() {
    axios
      .get(`/api/user/${this.props.match.params.id}`)
      .then(results => this.setState({ userInfo: results.data[0] }));
  }

  sendNewPassword(passphrase) {
    console.log(passphrase)
    // axios.post('/api/sendEmail1');
    axios.post('/api/sendEmail1', {passphrase})
  }

  render() {
    console.log(this.state);
    let cards = ['One', 'Two', 'Three'].map((e, i) => {
      return (
        <div key={i} className='card'>
          Title: {e}
        </div>
      );
    });
    return (
      <div className='profile_container'>
        <div className='inner_div_left'>
          <div className='top_left'>
            <>
              <sigil className='gryffindor sm' />
            </>
            <>
              <div className='top_right'>
                <h1>Harry Potter</h1>
                <div className='bottom_right'>
                  <h3>Followers 9{this.props.followers}</h3>
                  <h3>&#9961;</h3>
                  <h3>Following 10{this.props.following} </h3>
                </div>
              </div>
            </>
          </div>
          <div className='bottom'>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/149/149071.svg'}
                alt='user icon'
              />
              <h2>Student{this.props.role}</h2>
            </div>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/859/859170.svg'}
                alt='house logo'
              />
              <h2>Gryffindor {this.props.house}</h2>
            </div>
            <div className='trio'>
              <img
                src={'https://image.flaticon.com/icons/svg/281/281769.svg'}
                alt='email icon'
              />
              <h2> harrypottz@gmail.com {this.props.email}</h2>
            </div>
          </div>
          <div className='admin_controls'>
            <h1>Notify House Members</h1>
            <div className='admin_bottom'>
              <input
                placeholder={this.state.default_message}
                onChange={e =>
                  this.setState({ default_message: e.target.value })
                }
              />
              <button onClick={() => {this.sendNewPassword(this.state.default_message)}}>
                Send Email
              </button>
            </div>
          </div>
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
  const { user } = state;
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Profile);

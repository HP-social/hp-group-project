import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import './Card.scss';
import moment from 'moment';
import HouseHeader from '../../Tools/HouseHeader/HouseHeader';
import axios from 'axios';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forum: {}
    };
  }

  

  render() {
    const posts = [
      {
        likes: '3',
        post_id: 2,
        forum_id: 3,
        wizard_id: 1,
        post:
          'rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio',
        time: '2018-12-03T02:20:14.367Z',
        title: 'Lorem ipsum dolor sit amet, consectetuer.',
        gif: 'https://media.giphy.com/media/GkVM3PcFipxEk/giphy.gif',
        email: 'eebravo1@gmail.com',
        username: 'patientzero',
        house: 'ravenclaw',
        role: 'teacher',
        profile_img:
          'https://i.pinimg.com/originals/57/ff/0c/57ff0c61bea80020a91100064d85fa94.jpg'
      },
      {
        likes: '2',
        post_id: 20,
        forum_id: 3,
        wizard_id: 1,
        post:
          'porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo',
        time: '2018-12-03T02:20:14.367Z',
        title: 'Lorem ipsum dolor sit amet, consectetuer.',
        gif: 'https://media.giphy.com/media/720g7C1jz13wI/giphy.gif',
        email: 'eebravo1@gmail.com',
        username: 'patientzero',
        house: 'ravenclaw',
        role: 'teacher',
        profile_img:
          'https://i.pinimg.com/originals/57/ff/0c/57ff0c61bea80020a91100064d85fa94.jpg'
      },
      {
        likes: '1',
        post_id: 22,
        forum_id: 3,
        wizard_id: 2,
        post:
          'leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio',
        time: '2018-12-03T02:20:14.367Z',
        title: 'Lorem ipsum dolor sit amet, consectetuer.',
        gif: 'https://media.giphy.com/media/720g7C1jz13wI/giphy.gif',
        email: 'pskhiev@gmail.com',
        username: 'patronuskiller',
        house: 'gryffindor',
        role: 'teacher',
        profile_img:
          'https://img.buzzfeed.com/buzzfeed-static/static/2018-08/28/17/campaign_images/buzzfeed-prod-web-02/whats-your-patronus-1-5191-1535490992-0_big.jpg'
      }
    ];

    let timeNow = moment();
    let postTime = moment(posts[0].time);
    let duration = timeNow.diff(postTime, 'hours');

    const bottomIcon = [
      'https://image.flaticon.com/icons/svg/149/149217.svg',
      'https://image.flaticon.com/icons/svg/134/134797.svg',
      'https://image.flaticon.com/icons/svg/1174/1174410.svg'
    ];

    const bottomDiv = ['Likes', 'Comments', 'Bookmarks'].map((e, i) => {
      return (
        <div className='card' key={i}>
          <img src={bottomIcon[i]} alt='icons' />
          <h3>{e}</h3>
        </div>
      );
    });

    const dynamicCard = [posts].map((e, i) => {
      return (
        <>
          {/* <HouseHeader house={'gryffindor'}/> */}
          <div className='card_main' key={i}>
            <div className='top_username'>
              <div className='top_left'>
                <sigil className='gryffindor sm' />
                <h1>{e[i].username}</h1>
              </div>
              <div className='top_right'>
                <h3>
                  <img
                    src='https://image.flaticon.com/icons/svg/66/66163.svg'
                    alt='icons'
                  />
                  {duration} Hours Ago
                </h3>
              </div>
            </div>
            <div className='mid_title'>{e[i].title}</div>
            <div className='media_container'>
              <img src={e[i].gif} alt='icons' />
            </div>
            <p className='text_area'>{e[i].post}</p>
            <div className='bottom_container'>{bottomDiv}</div>
          </div>
        </>
      );
    });
    return (
      <>
        {/* <HouseHeader house={'gryffindor'}/> */}
        {/* <HouseHeader house={this.state.user.house ==== 'gryffindor' ? 'gryffindor' :}/> */}
        <>{dynamicCard}</>
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

export default connect(
  mapStateToProps,
  { setUser }
)(Card);

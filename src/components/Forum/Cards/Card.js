import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import './Card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const posts= [{"likes": "3","post_id": 2,"forum_id": 3,"wizard_id": 1,"post": "rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio","time": "2018-12-03T02:20:14.367Z","title": "Lorem ipsum dolor sit amet, consectetuer.","gif": "https://media.giphy.com/media/GkVM3PcFipxEk/giphy.gif","email": "eebravo1@gmail.com","username": "patientzero","house": "ravenclaw","role": "teacher","profile_img": "https://i.pinimg.com/originals/57/ff/0c/57ff0c61bea80020a91100064d85fa94.jpg"},{"likes": "2","post_id": 20,"forum_id": 3,"wizard_id": 1,"post": "porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo","time": "2018-12-03T02:20:14.367Z","title": "Lorem ipsum dolor sit amet, consectetuer.","gif": "https://media.giphy.com/media/720g7C1jz13wI/giphy.gif","email": "eebravo1@gmail.com","username": "patientzero","house": "ravenclaw","role": "teacher","profile_img": "https://i.pinimg.com/originals/57/ff/0c/57ff0c61bea80020a91100064d85fa94.jpg"},{"likes": "1","post_id": 22,"forum_id": 3,"wizard_id": 2,"post": "leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio","time": "2018-12-03T02:20:14.367Z","title": "Lorem ipsum dolor sit amet, consectetuer.","gif": "https://media.giphy.com/media/720g7C1jz13wI/giphy.gif","email": "pskhiev@gmail.com","username": "patronuskiller","house": "gryffindor","role": "teacher","profile_img": "https://img.buzzfeed.com/buzzfeed-static/static/2018-08/28/17/campaign_images/buzzfeed-prod-web-02/whats-your-patronus-1-5191-1535490992-0_big.jpg"}]

    const cardImg = [
      'https://image.flaticon.com/icons/svg/149/149217.svg',
      'https://image.flaticon.com/icons/svg/134/134797.svg',
      'https://image.flaticon.com/icons/svg/25/25667.svg'
    ];

    const bottomDiv = ['Likes', 'Comments', 'Bookmarks'].map((e, i) => {
      return (
        <div className='card' key={i}>
          <img src={cardImg[i]}/>
          <h3>{e}</h3>
        </div>
      );
    });
    return (
      <div className='card_main'>
        <div className='top_username'>
        
        {posts[0].username}
        
        </div>
        <div className='mid_title'>{posts[0].title}</div>
        <div className='media_container'>
        <img src={posts[0].gif}/>
        </div>
        <p className='text_area'>
          {posts[0].post}
        </p>
        <div className='bottom_container'>{bottomDiv}</div>
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
)(Card);

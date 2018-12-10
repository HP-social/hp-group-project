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
			isLiked: false,
			isBookmarked: false,
			post: {},
			likeNumber: 0,
			commentNumber: 0
		} 
  }

  componentDidMount() {
		axios.get(`/api/isLiked/${this.props.post_id}`).then((result) => {
			if (result.data.length > 0) {
				this.setState({ isLiked: true });
			}
		});
		axios.get(`/api/isBookmarked/${this.props.post_id}`).then((result) => {
			if (result.data.length > 0) {
				this.setState({ isBookmarked: true });
			}
		});
		axios
			.get(`/api/post/${this.props.post_id}`)
			.then((result) => this.setState({ post: result.data }));
		axios
			.get(`/api/likes/${this.props.post_id}`)
			.then((result) => this.setState({ likeNumber: result.data }));
		axios
			.get(`/api/comments/${this.props.post_id}`)
			.then((result) => this.setState({ commentNumber: result.data }));
	}

  

  render() {
    
    let timeNow = moment();
    let postTime = moment(this.props.post.time);
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

    const dynamicCard = [this.props.post].map((e, i) => {
      return (
        <>
          {/* <HouseHeader house={'gryffindor'}/> */}
          <div className='card_main' key={i}>
            <div className='top_username'>
              <div className='top_left'>
                <sigil className='gryffindor sm' />
                <h3>{e.username}</h3>
                
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
            <div className='mid_title'>{e.title}<div className='triangle'></div></div>
            <div className='media_container'>
              <img src={e.gif} alt='icons' />
            </div>
            <p className='text_area'>{e.post}</p>
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

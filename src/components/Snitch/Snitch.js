import React, { Component } from 'react';
import './Snitch.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';

class Snitch extends Component {
  constructor() {
    super();

    this.state = {
      points: 0,
      empty: ''
    };
  }

  snitch = () => {
    alert(`100 points for ${this.props.user.house}!!!!`);
    this.setState({ points: this.state.points + 100 }, () => {
        axios.post('/api/addpoints', {
            wizard_id: this.props.user.wizard_id,
            house: this.props.user.house,
            points: this.state.points
        }).then(()=>this.setState({points:0}))
    });
}

  render() {
    return (
      <div className='container'>
        {' '}
        <svg
          onClick={() => this.snitch()}
          className='snitch'
          version='1.1'
          id='Capa_1'
          x='0px'
          y='0px'
          viewBox='0 0 512 512'
          width='512px'
          height='512px'
        >
          <g>
            <g>
              <g>
                <path
                  d='M256,448c-23.521,0-42.667-19.135-42.667-42.667c0-5.896-4.771-10.667-10.667-10.667     c-5.896,0-10.667,4.771-10.667,10.667c0,35.292,28.708,64,64,64c5.896,0,10.667-4.771,10.667-10.667     C266.667,452.77,261.896,448,256,448z'
                  fill='black'
                />
                <path
                  d='M512,64c0-23.875-20.75-55.698-23.125-59.25C486.167,0.666,481-1,476.458,0.604c-4.604,1.625-7.521,6.167-7.083,11.031     c5.167,56.771-28.083,73.635-63.271,91.49c-30.354,15.406-64.771,32.854-64.771,78.208c0,22.417,5.438,34.594,10.708,46.354     c5.458,12.229,10.625,23.771,10.625,49.646c0,33.223-16.763,50.956-26.438,58.477c-19.573-22.557-48.092-37.143-80.229-37.143     c-32.132,0-60.648,14.583-80.221,37.134c-9.615-7.492-26.445-25.241-26.445-58.467c0-25.875,5.167-37.417,10.625-49.646     c5.271-11.76,10.708-23.938,10.708-46.354c0-45.354-34.417-62.802-64.771-78.208C70.708,85.27,37.458,68.406,42.625,11.635     c0.438-4.865-2.479-9.406-7.083-11.031C30.938-0.98,25.833,0.687,23.125,4.75C20.75,8.302,0,40.125,0,64     c0,20.906,0.375,24.24,9,41.802c-4.063,7.26-9,20.781-9,43.531c0,28.594,20.729,49.333,31.083,57.896     c-2,18.427,3.167,48.167,33.604,66.146c3.105,14.852,19.409,47.967,97.827,81.676c-8.135,15.052-13.181,32.007-13.181,50.283     C149.333,464.145,197.188,512,256,512s106.667-47.854,106.667-106.667c0-18.279-5.048-35.236-13.185-50.289     c78.405-33.704,94.725-66.819,97.831-81.669c30.417-17.979,35.604-47.719,33.604-66.146C491.271,198.666,512,177.927,512,149.333     c0-22.75-4.938-36.271-9-43.531C511.625,88.239,512,84.906,512,64z M136.167,318.427c-49.979-28.521-50.854-50.792-50.875-50.792     c0.396-4.375-1.917-8.542-5.854-10.51c-34.229-17.104-26.75-50.521-26.417-51.875c1.083-4.344-0.688-8.927-4.417-11.438     c-0.271-0.188-27.271-18.719-27.271-44.479c0-25.833,7.583-35.146,7.542-35.146v0.01c3.25-3.25,4.042-8.208,2-12.313     C21.333,82.812,21.333,82.812,21.333,64c0-4.021,1.042-8.75,2.667-13.677c10.417,40.469,44.021,57.51,72.25,71.833     c32.917,16.698,53.083,28.49,53.083,59.177c0,17.865-4.104,27.031-8.854,37.646C134.625,232.073,128,246.906,128,277.333     C128,293.802,131.333,307.385,136.167,318.427z M256,490.666c-47.063,0-85.333-38.281-85.333-85.333     C170.667,358.281,208.938,320,256,320s85.333,38.281,85.333,85.333C341.333,452.385,303.063,490.666,256,490.666z      M482.854,113.927c0.083,0.083,7.813,9.323,7.813,35.406c0,25.76-27,44.292-27.271,44.479c-3.729,2.51-5.5,7.094-4.417,11.438     c0.354,1.406,8.208,34.573-26.417,51.875c-3.604,1.802-5.875,6-5.875,10.031c0,0.281-0.771,22.656-50.854,51.26     c4.854-11.052,8.167-24.625,8.167-41.083c0-30.427-6.625-45.26-12.479-58.354c-4.75-10.615-8.854-19.781-8.854-37.646     c0-30.688,20.167-42.479,53.083-59.177c28.229-14.323,61.833-31.365,72.25-71.833c1.625,4.927,2.667,9.656,2.667,13.677     c0,18.813,0,18.813-9.542,37.885C479.208,105.739,480.042,110.666,482.854,113.927z'
                  fill='gold'
                />
              </g>
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
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
)(Snitch);
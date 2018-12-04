import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import "./LandingPage.scss";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="main_landing">
        <div className="img_overlay" />
        <div className="top_castle" />
        <div className="mid_container">
					<div className='card'>1</div>
					<div className='card'>2</div>
					<div className='card'>3</div>
				</div>
        <div className="bottom_castle">hi3</div>
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

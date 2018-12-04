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
    const icon = [
      "https://image.flaticon.com/icons/svg/859/859170.svg",
      "https://image.flaticon.com/icons/svg/784/784629.svg",
      "https://image.flaticon.com/icons/svg/149/149054.svg"
    ];
    const text = [
      "Join A Noble House",
      "Interact In Public & Private Communites",
      "Discover Adventure Throughout Hogwarts!"
    ];
    const cardTitle = ["Houses", "Communities", "Explore"].map((e, i) => {
      return (
        <div className="card" key={i}>
          <>
            <img src={icon[i]} alt="oops" />
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
      <div className="main_landing">
        <div className="img_overlay" />
        <div className="top_castle" />
        <div className="mid_container">{cardTitle}</div>
        <div className="bottom_container">hi</div>
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

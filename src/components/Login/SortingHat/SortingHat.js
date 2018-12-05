import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../../ducks/reducer";
import "./SortingHat.scss";
import axios from "axios";
import swal from "sweetalert2";


class SortingHat extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
	  finished: false,
      slytherin: 0,
      gryffindor: 0,
      ravenclaw: 0,
      hufflepuff: 0,
      questions: [],
	  answers: [],
	  winning_house: ''
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/quiz/questions")
      .then(result => this.setState({ questions: result.data }));

    axios
      .get("http://localhost:3001/api/quiz/answers")
      .then(result => this.setState({ answers: result.data }));
  }
  change() {
	
    if (this.state.index < 17) this.setState({ index: this.state.index + 1 });
    else {
		this.returnResultsPage()	
    }
  }

  clickAnswer(item) {
    this.setState(
      {
        gryffindor: this.state.gryffindor + item.gryffindor,
        hufflepuff: this.state.hufflepuff + item.hufflepuff,
        ravenclaw: this.state.ravenclaw + item.ravenclaw,
        slytherin: this.state.slytherin + item.slytherin
      },
      () => this.change()
    );
    // console.log(item)
    console.log("gryffindor", this.state.gryffindor);
    console.log("ravenclaw", this.state.ravenclaw);
    console.log("hufflepuff", this.state.hufflepuff);
    console.log("slytherin", this.state.slytherin);
  }

  returnResultsPage() {
	let {gryffindor, slytherin, ravenclaw, hufflepuff} = this.state
	if(ravenclaw > slytherin && ravenclaw > gryffindor && ravenclaw > hufflepuff) {
		this.setState({winning_house: 'Ravenclaw'}, ()=> name())
		
	}
	else if(slytherin > gryffindor && slytherin > hufflepuff && slytherin > ravenclaw) {
		this.setState({winning_house: 'Slytherin'}, ()=> name())
		
	}

	else if(gryffindor > ravenclaw && gryffindor > slytherin && gryffindor > hufflepuff) {
		this.setState({winning_house: 'Gryffindor'}, ()=> name())
		
	}

	else {
		this.setState({winning_house: 'Hufflepuff'}, ()=> name())
		
	}
	
 let name = () => {swal({
		title: "Congratulations",
		text: `You have been sorted into ${this.state.winning_house}`,
		type: "success",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Confirm Order"
	  })
  }}
  
  render() {
	
    let answers = this.state.answers
      .filter(
        item =>
          item.question_id ===
          this.state.questions[this.state.index].question_id
      )
      .map(item => (
        <div className='answer' onClick={() => this.clickAnswer(item)}>
          {item.answer}
        </div>
	  ));
	  console.log('the winning house is', this.state.winning_house) 
    return (
      <div className='sortingHatQuestionBox'>
        <div className='quiz'>Harry Potter</div>
        <img
          className='sortingHatPicture'
          src='https://www.hp-lexicon.org/wp-content/uploads/2016/09/the_sorting_hat_by_sahinduezguen-d47mwt5.png' alt='text'
        />
        <div className='sortingHatQuestion'>
          {this.state.questions[5] &&
            this.state.questions[this.state.index].text}
        </div>
        <div className='sortingHatAnswers'>
          {this.state.index < 18 && answers}
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
)(SortingHat);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import './SortingHat.scss';

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
		  questions: [
			{
			  question_id: 1,
			  text: "If you could have one superpower what would it be"
			},
			{
			  question_id: 2,
			  text: "How important is diversity to you?"
			},
			{
			  question_id: 3,
			  text:
				"Which of the following laws of power do you adhere to the closest?"
			},
			{
			  question_id: 4,
			  text:
				"Which of the following laws of power do you need to work on the most?"
			},
			{
			  question_id: 5,
			  text: "In a group project, you are generally the one that..."
			},
			{
			  question_id: 6,
			  text: "Slytherins are evil."
			},
			{
			  question_id: 7,
			  text: "What is your idea of a good vacation"
			},
			{
			  question_id: 8,
			  text: "Which of the following is the most important to you..."
			},
			{
			  question_id: 9,
			  text:
				"A death eater approaches you in the forbidden forest and has you trapped. What do you do?"
			},
			{
			  question_id: 10,
			  text: `You are on the cat walk in the Great Hall and the fire alarm goes off. You look down and the entire floor is covered in flames. Filch's cat is nearby. What do you do?`
			},
			{
			  question_id: 11,
			  text: "How would your friends describe you?"
			},
			{
			  question_id: 12,
			  text: "What is a trait that you can’t stand in other people?"
			},
			{
			  question_id: 13,
			  text:
				"Some fifth years are picking on a first year. You are a third year. What do you do"
			},
			{
			  question_id: 14,
			  text:
				"Assuming you had the power granted to you in question 1, does your response for the last question change?"
			},
			{
			  question_id: 15,
			  text: "What famous person in history do you relate to the best?"
			},
			{
			  question_id: 16,
			  text:
				"You wake up from a dream and find yourself in the chamber of secrets. You see something glowing in the corner of the dark room and upon inspection it happens to be a glove with a special magnet that only attracts the golden snitch. The technology was banned by the World Quidditch Association in 560 B.C. What do you do?"
			},
			{
			  question_id: 17,
			  text: 'Have you ever been in the "friendzone" for a year or longer?'
			},
			{
			  question_id: 18,
			  text: "What house do you think you belong in?"
			}
		  ],
		  answers: [
			{
			  question_id: 1,
			  answer: `ability to read minds`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 2
			},
			{
			  question_id: 1,
			  answer: `talk to animals`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 1,
			  answer: `superhuman strength`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 1,
			  answer: `be invisible`,
			  gryffindor: 2,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 2,
			  answer: `Important - I need to be in a house that has a diverse group of people`,
			  gryffindor: 2,
			  hufflepuff: 5,
			  ravenclaw: 2,
			  slytherin: 0
			},
			{
			  question_id: 2,
			  answer: `Important - I need to be in a house that has a homogenous group of people`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 2,
			  answer:
				"Not important - I’m indifferent to whether the people in my house come from similiar or different backgrounds",
			  gryffindor: 2,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 3,
			  answer: `Enter Action With Boldness`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 3,
			  answer: `Be royal in your fashion. Act like a king to be treated like one`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 3,
			  answer: `Plan all the way to the end`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 3,
			  answer: `Make your accomplishments seem effortless`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 4,
			  answer: `Entering Action With Boldness`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 4,
			  answer: `Being Royal in Fashion`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 4,
			  answer: `Planning all the way to the end`,
			  gryffindor: 2,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 2
			},
			{
			  question_id: 4,
			  answer: `Making my Accomplishments Seem Effortless`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 5,
			  answer: `Assumes leadership, assigns task to the members`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 2,
			  slytherin: 3
			},
			{
			  question_id: 5,
			  answer: `Does not lead the group but has the best work`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 3,
			  slytherin: 0
			},
			{
			  question_id: 5,
			  answer: `Ends up doing the most work. Prefers individual work`,
			  gryffindor: 0,
			  hufflepuff: 3,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 5,
			  answer: `Ends up doing the least amount of work but still ends up getting a good grade`,
			  gryffindor: 1,
			  hufflepuff: 0,
			  ravenclaw: 1,
			  slytherin: 5
			},
			{
			  question_id: 6,
			  answer: `TRUE`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 2
			},
			{
			  question_id: 6,
			  answer: `FALSE`,
			  gryffindor: 0,
			  hufflepuff: 2,
			  ravenclaw: 2,
			  slytherin: 5
			},
			{
			  question_id: 6,
			  answer: `I shall not judge others`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 2,
			  slytherin: 0
			},
			{
			  question_id: 6,
			  answer: `There are probably some good and evil ones depending on who you ask`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 7,
			  answer: `On a remote island with a good book`,
			  gryffindor: 0,
			  hufflepuff: 2,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 7,
			  answer: `camping in the backcountry`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 7,
			  answer: `at the family lakehouse `,
			  gryffindor: 2,
			  hufflepuff: 2,
			  ravenclaw: 2,
			  slytherin: 5
			},
			{
			  question_id: 7,
			  answer: `walking on a slackline 1000 ft above grouund in Yosemite Valley`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 8,
			  answer: `Being the individual responsible for world peace`,
			  gryffindor: 0,
			  hufflepuff: 10,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 8,
			  answer: `Increasing my net worth`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 8,
			  answer: `Win a nobel peace prize`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 8,
			  answer: `Being able to see my daughter walk and grow up to be a fine young lady`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 9,
			  answer: `Join its team`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 9,
			  answer: `Battle it`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 9,
			  answer: `negotiate`,
			  gryffindor: 2,
			  hufflepuff: 1,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 9,
			  answer: `cooperate`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 10,
			  answer: `grab the cat, bust open the window, and jump with the cat under your feet so that you don't break your ankles and paralyze your legs upon landing`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 10,
			  answer: `My family is on the burning floor below me. I must rescue them before I escape`,
			  gryffindor: 2,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 10,
			  answer: `Calculate the most efficient way and who if anybody is worth saving`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 10,
			  answer: `Go down the cat walk and run through the fire to rescue my mother and exit out the main door`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 2
			},
			{
			  question_id: 11,
			  answer: `Witty`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 2
			},
			{
			  question_id: 11,
			  answer: `Popular`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 2
			},
			{
			  question_id: 11,
			  answer: `A savage`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 11,
			  answer: `kind hearted`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 12,
			  answer: `Laziness`,
			  gryffindor: 2,
			  hufflepuff: 5,
			  ravenclaw: 2,
			  slytherin: 0
			},
			{
			  question_id: 12,
			  answer: `Stupidity`,
			  gryffindor: 2,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 2
			},
			{
			  question_id: 12,
			  answer: `Arrogance`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 12,
			  answer: `Cowardice`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 2
			},
			{
			  question_id: 13,
			  answer: `stand up for the first year`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 13,
			  answer: `don't get involved because I don't care`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 13,
			  answer: `laugh because it's just a joke`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 13,
			  answer: `don't get involved even though what they are doing is wrong`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 14,
			  answer: `Yes`,
			  gryffindor: 2,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 14,
			  answer: `No`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 2,
			  slytherin: 5
			},
			{
			  question_id: 15,
			  answer: `The Prince (Machiavelli)`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 15,
			  answer: `Gandhi`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 15,
			  answer: `Napoleon Bonaparte`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 15,
			  answer: `Leonardo da Vinci`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 16,
			  answer: `Turn it in to authorities`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 16,
			  answer: `Use it in a match only if my team was losing and the probability of getting caught was small`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 16,
			  answer: `Examine how every part pieces together in order to replicate some features and make millions`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 5,
			  slytherin: 0
			},
			{
			  question_id: 16,
			  answer: `practice with it but never use it in a match`,
			  gryffindor: 5,
			  hufflepuff: 2,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 17,
			  answer: `Yes`,
			  gryffindor: 0,
			  hufflepuff: 5,
			  ravenclaw: 3,
			  slytherin: 0
			},
			{
			  question_id: 17,
			  answer: `No`,
			  gryffindor: 5,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 5
			},
			{
			  question_id: 18,
			  answer: `Gryffindor`,
			  gryffindor: 10,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 0
			},
			{
			  question_id: 18,
			  answer: `Ravenclaw`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 10,
			  slytherin: 0
			},
			{
			  question_id: 18,
			  answer: `Slytherin`,
			  gryffindor: 0,
			  hufflepuff: 0,
			  ravenclaw: 0,
			  slytherin: 10
			},
			{
			  question_id: 18,
			  answer: `Hufflepuff`,
			  gryffindor: 0,
			  hufflepuff: 10,
			  ravenclaw: 0,
			  slytherin: 0
			}
		  ]
		};
	  }
	  change() {
		if(this.state.index < 17)
		this.setState({ index: this.state.index + 1 })
		else {this.setState({finished: true})};
	  }
	
	  clickAnswer(item) {
		this.setState({ gryffindor: this.state.gryffindor + item.gryffindor,
						hufflepuff: this.state.hufflepuff + item.hufflepuff ,
						ravenclaw: this.state.ravenclaw + item.ravenclaw,
						slytherin: this.state.slytherin + item.slytherin},()=>
						this.change());
						// console.log(item)
						console.log('gryffindor', this.state.gryffindor)
						console.log('ravenclaw', this.state.ravenclaw)
						console.log('hufflepuff', this.state.hufflepuff)
						console.log('slytherin', this.state.slytherin)
	
	  }
	
	  returnResultsPage() {
	
	  }
	
	  render() {
		let answers = this.state.answers
		  .filter(
			item =>
			  item.question_id ===
			  this.state.questions[this.state.index].question_id
		  )
		  .map(item => <div className='answer' onClick={()=>this.clickAnswer(item)}>{item.answer}</div>);
		return (
			<div className='sortingHatQuestionBox'>
			<div className='quiz'>Harry Potter</div>
			  <img className='sortingHatPicture' src='https://www.hp-lexicon.org/wp-content/uploads/2016/09/the_sorting_hat_by_sahinduezguen-d47mwt5.png'></img>
			  <div className='sortingHatQuestion'>
			  {this.state.questions[this.state.index].text}
			  </div>
			  <div className='sortingHatAnswers'>
			  {this.state.index < 17 && answers}
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

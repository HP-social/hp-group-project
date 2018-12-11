import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/reducer';
import './SortingHat.scss';
import axios from 'axios';
import swal from 'sweetalert2';
import Tweet from '../../Tweet/Tweet';

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
					text: 'If you could have one superpower what would it be'
				}
			],
			answers: [],
			winning_house: [],
			crest: [],
			gif: [],
			makeATweet: false
		};

		this.tweet = this.tweet.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/api/quiz/questions')
			.then((result) => this.setState({ questions: result.data }));

		axios
			.get('http://localhost:3001/api/quiz/answers')
			.then((result) => this.setState({ answers: result.data }));
	}
	change() {
		if (this.state.index < 17) this.setState({ index: this.state.index + 1 });
		else {
			this.returnResultsPage();
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
		console.log('gryffindor', this.state.gryffindor);
		console.log('ravenclaw', this.state.ravenclaw);
		console.log('hufflepuff', this.state.hufflepuff);
		console.log('slytherin', this.state.slytherin);
	}

	returnResultsPage() {
		let { gryffindor, slytherin, ravenclaw, hufflepuff } = this.state;
		if (
			ravenclaw > slytherin &&
			ravenclaw > gryffindor &&
			ravenclaw > hufflepuff
		) {
			this.setState(
				{
					winning_house: 'Ravenclaw',
					crest:
						'https://images-na.ssl-images-amazon.com/images/I/61XvQSdFHlL._SY450_.jpg',
					gif: 'https://tenor.com/qh4T.gif'
				},
				() => name()
			);
		} else if (
			slytherin > gryffindor &&
			slytherin > hufflepuff &&
			slytherin > ravenclaw
		) {
			this.setState(
				{
					winning_house: 'Slytherin',
					crest:
						'https://www.logolynx.com/images/logolynx/37/37c001eedb4d6ff394a8635f7e8b978d.png',
					gif: 'https://media.giphy.com/media/Gyb7Mrx7jlGF2/giphy.gif'
				},
				() => name()
			);
		} else if (
			gryffindor > ravenclaw &&
			gryffindor > slytherin &&
			gryffindor > hufflepuff
		) {
			this.setState(
				{
					winning_house: 'Gryffindor',
					crest:
						'https://i.pinimg.com/originals/1a/64/49/1a6449ba53c49b816d56c5abbbb1d8dc.jpg',
					gif: 'https://media.giphy.com/media/Tl2AK8HOHj7SU/giphy.gif'
				},
				() => name()
			);
		} else {
			this.setState(
				{
					winning_house: 'Hufflepuff',
					crest:
						'http://jkfloodrelief.org/wp-content/uploads/2018/05/img-beautiful-hufflepuff-crest-pottermore.png',
					gif: 'https://media.giphy.com/media/1UAIoVWRhtjhe/giphy.gif'
				},
				() => name()
			);
		}

		let name = () => {
			swal({
				title: 'Congratulations!',
				text: `You are a ${this.state.winning_house}.`,
				imageUrl: `${this.state.crest}`,
				imageWidth: 150,
				imageHeight: 150,
				imageAlt: 'house crest',
				confirmButtonText: 'I Accept',
				background: '#fff url()'
			}).then((result) => this.sendToHouse(result));
		};
	}

	sendToHouse = () => {
		console.log('window dot location', window.location);
		window.location.pathname =
			`/profile/${this.props.user.wizard_id}` && '/profile/1';
	};

	tweet = () => {
		this.setState({ makeATweet: !this.state.makeATweet });
		console.log(this.state.makeATweet);
	};

	render() {
		let answers =
			this.state.answers &&
			this.state.answers
				.filter(
					(item) =>
						item.question_id ===
						this.state.questions[this.state.index].question_id
				)
				.map((item) => (
					<div className='answer' onClick={() => this.clickAnswer(item)}>
						{item.answer}
					</div>
				));
		console.log('the winning house is', this.state.winning_house);
		return (
			<div className='theQuiz'>
				<div className='sortingHatQuestionBox'>
					<div id='quiz_name'>Sorting Hat Quiz</div>
					<img
						className='sortingHatPicture'
						src='https://www.hp-lexicon.org/wp-content/uploads/2016/09/the_sorting_hat_by_sahinduezguen-d47mwt5.png'
						alt='text'
					/>
					<div className='sortingHatQuestion'>
						{this.state.questions[5] &&
							this.state.questions[this.state.index].text}
					</div>
					<div className='sortingHatAnswers'>
						{this.state.index < 18 && answers}
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
)(SortingHat);

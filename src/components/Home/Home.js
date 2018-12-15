import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';

class Home extends Component {
	constructor(props) {
		super(props);
		var today = new Date();
		var month = today.getMonth();
		var day = today.getDate();
		var year = today.getFullYear();
		var daily = today.getDay();

		this.state = {
			weather: {
				weather: [
					{
						description: 'light rain'
					}
				],
				base: 'stations',
				main: {
					temp: 280.44,
					humidity: 61
				},
				wind: {
					speed: 8.2
				}
			},
			index: 0,
			day: day,
			daily: daily,
			month: month,
			year: year,
			postal: 11111,
			country: 'us',
			posts: [
				{
					title: 'Your News is Coming Soon!',
					username: 'a top writer',
					location: 'The Chamber of Secrets??!!',
					gif: 'https://media.giphy.com/media/ntXQuOs4olNRe/giphy.gif',
					post:
						'isse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diamisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque'
				}
			],
			city: '',
			state: ''
		};
	}

	componentDidMount() {
		axios
			.get(`/api/news/${this.props.user.wizard_id}`)
			.then((result) => this.setState({ posts: result.data }));

		axios.get('http://ipinfo.io').then((result) =>
			this.setState(
				{
					city: result.data.city,
					state: result.data.region,
					postal: result.data.postal,
					country: result.data.country
				},
				() => this.setWeather()
			)
		);
	}

	setWeather() {
		axios
			.get(
				`http://api.openweathermap.org/data/2.5/weather?zip=${
					this.state.postal
				},${this.state.country}&appid=08746b1d56e593de570bb6ef983ed9d9`
			)
			.then((result) => this.setState({ weather: result.data }));
	}

	nextPage() {
		this.setState({ index: this.state.index + 1 });
	}

	render() {
		let cards = this.state.posts.map((e, i) => (
			<div className='news_card' key={i}>
				<Link to={`/post/${e.post_id}`}>
					<h1>{e.title}</h1>
				</Link>
				<div className='line' />
				<br />
				<img src={e.gif} alt='gif' />
				<Link to={`/foum/${e.forum_id}`} />
				<div>Room:{e.location}</div>
			</div>
		));
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];
		let page = this.state.index + 1;
		let pageCount = Math.ceil(this.state.posts.length / 5);
		let cut = this.state.index * 5;
		let styles = [
			{ title: 'headline hl3', username: 'headline hl4' },
			{ title: 'headline hl5', username: 'headline hl6' },
			{ title: 'headline hl1', username: 'headline hl2' },
			{ title: 'headline hl3', username: 'headline hl4' },
			{ title: 'headline hl1', username: 'headline hl2' }
		];
		let column = this.state.posts.slice(cut, cut + 5).map((e, i) => {
			return (
				<div key={i} className='collumn'>
					<div className='head'>
						<Link to={`/post/${e.post_id}`}>
							<span className={styles[i].title}>{e.title}</span>
						</Link>
						<div className='p'>
							<Link to={`/profile/${e.wizard_id}`}>
								<span className={styles[i].username}>by {e.username}</span>
							</Link>
						</div>
					</div>

					{/* <p>{e.post}</p> */}
					<div className='p'>
						{e.post.slice(0, parseInt(e.post.length / 4))}
					</div>
					<figure className='figure'>
						<Link to={`/forum/${e.forum_id}`}>
							<img className='media' src={e.gif} alt='' />
							<figcaption className='figcaption'>
								Location: {e.location}
							</figcaption>
						</Link>
					</figure>
					<div className='p'>{e.post.slice(parseInt(e.post.length / 4))}</div>
				</div>
			);
		});
		return (
			<div>
				{
					<div className='paper'>
						<div className='head'>
							<div className='headerobjectswrapper'>
								<div className='weatherforcastbox'>
									<span
										style={{
											fontStyle: 'italic',
											fontWeight: 'bold',
											fontSize: '1.3em'
										}}
									>
										Today's Forcast: {this.state.weather.weather[0].description}
									</span>
									<br />
									<span>
										Wind: {this.state.weather.wind.speed}mph; Temp:{' '}
										{parseInt(
											(parseFloat(this.state.weather.main.temp) - 273.15) * 9
										) /
											5 +
											32}
										°F; Hum: {this.state.weather.main.humidity}%
									</span>
								</div>
								<div className='header'>The Daily Prophet</div>
							</div>

							<div className='subhead'>
								{this.state.city}, {this.state.state} -{' '}
								{days[this.state.daily - 1]}, {months[this.state.month]}{' '}
								{this.state.day}, {this.state.year} - {pageCount} PAGES
							</div>
						</div>
						<div className='content'>
							<div className='collumns'>{column}</div>
						</div>
						<span className='page' onClick={() => this.nextPage()}>
							{page}
						</span>
					</div>
				}
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

export default connect(mapStateToProps)(Home);

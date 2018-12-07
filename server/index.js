require('dotenv').config();
// ***** Dependencies  ****

const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
// ***** Import Server Controllers ****
const {
	getFollowed,
	getBookmarks,
	getSubscriptions
} = require('./controllers/favoritesController');
const { getPosts, getLikes } = require('./controllers/forumController');
const { getQuestions, getAnswers } = require('./controllers/quizController');
const { getUser, getNews } = require('./controllers/userController');
const { getFriends, checkFriends } = require('./controllers/messageController');

const session = require('express-session');

const port = 3001;

const app = express();
app.use(json());
app.use(cors());

// ***** ExpressStatic ****

// app.use(express.static(__dirname + "/../public/build/"));

// ***** Sessions Setup ****
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		user: [],
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
		}
	})
);

// ***** Massive Setup ****

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

// ***** Quiz Endpoints ****
app.get('/api/quiz/questions', getQuestions);
app.get('/api/quiz/answers', getAnswers);

// ***** User Endpoints ****
app.get('/api/user/:id', getUser);
app.get('/api/news/:id', getNews);

// ***** Favorites Endpoints ****
app.get('/api/followed/:id', getFollowed);
app.get('/api/bookmarks/:id', getBookmarks);
app.get('/api/subscriptions/:id', getSubscriptions);

// ***** Forum Endpoints ****
app.get('/api/forum/posts/:id', getPosts); //likes comes in as a string
app.get('/api/likes/:postid', getLikes); //likes comes in as a string

// ***** Message Endpoints ****
app.get('/api/message/friends/:userid/:wizardid', checkFriends);
app.get('/api/message/allfriends/:id', getFriends);

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});

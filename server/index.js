require('dotenv').config();
// ***** Dependencies  ****

const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const AuthStrategy = require('passport-auth0');
// ***** Import Server Controllers ****
const {
	getFollowed,
	getBookmarks,
	getSubscriptions,
	isLiked,
	isBookmarked,
	likeNumber,
	commentNumber
} = require('./controllers/favoritesController');
const {
	getPosts,
	getLikes,
	getForums,
	getForum,
	getPost
	// getHouseEmails
} = require('./controllers/forumController');
const { getQuestions, getAnswers } = require('./controllers/quizController');
const { getUser, getNews, getWizard } = require('./controllers/userController');
const { getFriends, checkFriends } = require('./controllers/messageController');
const {
	makePost,
	deletePost,
	updatePost
} = require('./controllers/postController');

// //**** Nodemailer ****
const {
	sendEmail1,
	sendEmail2,
	getHouseEmails
} = require('./controllers/nodemailerController');

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

// ***** Auth0 Setup ****

app.use(passport.initialize());
app.use(passport.session());
//clientID must be capital I capital D | AND ALL AuthStrategy KEYS MUST MATCH BELOW CASE
passport.use(
	new AuthStrategy(
		{
			domain: process.env.DOMAIN,
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/login', //Auth0 allowed callback URL
			scope: 'openid email profile'
		},
		(authToken, refreshToken, extraParams, profile, done) => {
			done(null, profile); //99% of time looks like this
		}
	)
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// ***** Massive Setup ****

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

// ***** Auth Endpoints ****

app.get(
	'/login',
	passport.authenticate('auth0', {
		successRedirect: '/success',
		failureRedirect: '/login'
	})
);

app.get('/success', (req, res, next) => {
	req.app
		.get('db')
		.wizards.where(`email=$1`, req.user._json.email)
		.then((result) => {
			req.session.user = result[0];

			res.redirect(`${process.env.REACT_APP_FRONTEND}/sortinghat`);
		})
		.catch((err) => console.log(err));
});

app.get('/api/logout', (req, res, next) => {
	req.session.destroy();
	res.status(200).json('So long, muggle!');
});

app.get('/api/test', (req, res, next) => {
	res.status(200).json(req.session);
});

// ***** Quiz Endpoints ****
app.get('/api/quiz/questions', getQuestions);
app.get('/api/quiz/answers', getAnswers);

// ***** User Endpoints ****
app.get('/api/user', getUser);
app.get('/api/wizard/:id', getWizard);
app.get('/api/news/:id', getNews);

// ***** Favorites Endpoints ****
app.get('/api/followed/:id', getFollowed);
app.get('/api/bookmarks/:id', getBookmarks);
app.get('/api/subscriptions/:id', getSubscriptions);
app.get('/api/isliked/:id', isLiked);
app.get('/api/isbookmarked/:id', isBookmarked);
app.get('/api/likenumber/:id', likeNumber);
app.get('/api/postnumber/:id', commentNumber);

// ***** Forum Endpoints ****
app.get('/api/forum/posts/:id', getPosts); //likes comes in as a string
app.get('/api/likes/:postid', getLikes); //likes comes in as a string

// ***** Forum Endpoints ****
app.get('/api/post/:postid', getPost);
app.post('/api/post/', makePost);
app.put('/api/post/:postid', updatePost);
app.delete('/api/post/:postid', deletePost);
app.get('/api/forums', getForums);
app.get('/api/forum/:id', getForum);

// ***** Message Endpoints ****
app.get('/api/message/friends/:userid/:wizardid', checkFriends);
app.get('/api/message/allfriends/:id', getFriends);

// ***** Nodemailer Endpoints ****
app.post('/api/sendEmail1', sendEmail1);
app.get('/api/emails', getHouseEmails);
// app.post('/api/sendEmail2', sendEmail2);

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});

require('dotenv').config();
// ***** Dependencies  ****

const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const AuthStrategy = require('passport-auth0');
const path = require('path'); // Usually moved to the start of file

// ***** Import Server Controllers ****
const {
	getFollowed,
	getBookmarks,
	getSubscriptions,
	isLiked,
	isBookmarked,
	likeNumber,
	commentNumber,
	followerNumber,
	followingNumber,
	deleteSubscription,
	deleteBookmark,
	addSubscription,
	addBookmark,
	getPins,
	isSubscribed,
	addPostLike,
	deletePostLike,
	addCommentLike,
	deleteCommentLike,
	isCommentLiked
} = require('./controllers/favoritesController');
const {
	getPosts,
	getLikes,
	getForums,
	getForum,
	getPost,
	getComments,
	makeComment,
	deleteComment,
	updateComment
	// getHouseEmails
} = require('./controllers/forumController');
const { getQuestions, getAnswers } = require('./controllers/quizController');
const {
	getUser,
	getNews,
	getWizard,
	addPoints,
	getPostMentions,
	getCommentMentions,
	getWizardMentions,
	getAuxPoints,
	commentMentionsCount,
	postMentionsCount
} = require('./controllers/userController');
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

const port = process.env.PORT || 3001;

const app = express();
app.use(json());
app.use(cors());

// ***** ExpressStatic ****

app.use(express.static(`${__dirname}/../build/`));

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

			res.redirect(`${process.env.REACT_APP_FRONTEND}/forum/1`);
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
app.post('/api/addpoints', addPoints);
app.get('/api/postmentions', getPostMentions);
app.get('/api/commentmentions', getCommentMentions);
app.get('/api/wizardmentions', getWizardMentions);
app.get('/api/getauxpoints', getAuxPoints);
app.get('/api/countcommentmentions', commentMentionsCount);
app.get('/api/countpostmentions', postMentionsCount);

// ***** Favorites Endpoints ****
app.get('/api/followed/:id', getFollowed);
app.get('/api/bookmarks/:id', getBookmarks);
app.get('/api/pins/:id', getPins);
app.get('/api/subscriptions/:id', getSubscriptions);
app.get('/api/isliked/:id', isLiked);
app.get('/api/isbookmarked/:id', isBookmarked);
app.get('/api/likenumber/:id', likeNumber);
app.get('/api/postnumber/:id', commentNumber);
app.get('/api/followernumber/:id', followerNumber);
app.get('/api/followingnumber/:id', followingNumber);
app.delete('/api/deletebookmark/:id', deleteBookmark);
app.delete('/api/deletesubscription/:id', deleteSubscription);
app.post('/api/addbookmark/:id', addBookmark);
app.post('/api/addsubscription/:id', addSubscription);
app.get('/api/issubscribed/:id', isSubscribed);
app.post('/api/addpostlike/:id', addPostLike);
app.delete('/api/deletepostlike/:id', deletePostLike);
app.post('/api/addcommentlike/:id', addCommentLike);
app.delete('/api/deletecommentlike/:id', deleteCommentLike);
app.get('/api/iscommentliked/:id', isCommentLiked);

// ***** Forum Endpoints ****
app.get('/api/forum/posts/:id', getPosts); //likes comes in as a string
app.get('/api/forums', getForums);
app.get('/api/forum/:id', getForum);

// ***** Post Endpoints ****
app.get('/api/post/:postid', getPost);
app.post('/api/post/', makePost);
app.put('/api/post/:postid', updatePost);
app.delete('/api/post/:postid', deletePost);
app.get('/api/likes/:postid', getLikes); //likes comes in as a string

// ***** Comment Endpoints ****
app.get('/api/comment/:id', getComments);
app.post('/api/comment', makeComment);
app.put('/api/comment/:id', updateComment);
app.delete('/api/comment/:id', deleteComment);

// ***** Message Endpoints ****
app.get('/api/message/friends/:userid/:wizardid', checkFriends);
app.get('/api/message/allfriends/:id', getFriends);

// ***** Nodemailer Endpoints ****
app.post('/api/sendEmail1', sendEmail1);
app.get('/api/emails', getHouseEmails);
// app.post('/api/sendEmail2', sendEmail2);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});

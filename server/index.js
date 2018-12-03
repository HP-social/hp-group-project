require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const { getFollowed } = require('./controllers/favoritesController');
const { getPosts } = require('./controllers/forumController');

const session = require('express-session');

const port = 3001;

const app = express();
app.use(json());
app.use(cors());
// app.use(express.static(__dirname + "/../public/build/"));
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

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

app.get('/api/followed', getFollowed); //get the followed data
app.get('/api/forum/posts/:id', getPosts); //get the forum posts

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});

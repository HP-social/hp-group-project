module.exports = {
	getFollowed: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from follow join wizards on wizards.wizard_id=follow.followed_id join forum_post on forum_post.wizard_id=wizards.wizard_id where follower_id=${
					req.params.id
				} order by time`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getBookmarks: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from bookmarks join forum_post on bookmarks.post_id=forum_post.post_id join wizards on wizards.wizard_id=forum_post.wizard_id where bookmarks.wizard_id=${
					req.params.id
				} and forum_post.wizard_id!=${req.params.id} order by time`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getPins: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from bookmarks join forum_post on bookmarks.post_id=forum_post.post_id join wizards on wizards.wizard_id=forum_post.wizard_id where bookmarks.wizard_id=${
					req.params.id
				} and forum_post.wizard_id=${req.params.id} order by time`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	deleteBookmark: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from bookmarks where post_id=${req.params.id} and wizard_id=${
					req.session.user.wizard_id
				}`
			)
			.catch((err) => res.status(500).send(err));
	},
	addBookmark: (req, res, next) => {
		req.app
			.get('db')
			.bookmarks.insert({
				post_id: req.params.id,
				wizard_id: req.session.user.wizard_id
			})
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	getSubscriptions: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from subscribe join forum on subscribe.forum_id=forum.forum_id where subscribe.wizard_id=${
					req.params.id
				}`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	deleteSubscription: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from subscribe where forum_id=${req.params.id} and wizard_id=${
					req.session.user.wizard_id
				}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	addSubscription: (req, res, next) => {
		req.app
			.get('db')
			.subscribe.insert({
				forum_id: req.params.id,
				wizard_id: req.session.user.wizard_id
			})
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	isLiked: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from likes where post_id=${req.params.id} and wizard_id=${
					req.session.user.wizard_id
				}`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	isBookmarked: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from bookmarks where post_id=${req.params.id} and wizard_id=${
					req.session.user.wizard_id
				}`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	likeNumber: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select count(*)as likesNumber from likes where post_id=${
					req.params.id
				}`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	commentNumber: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from subscribe join forum on subscribe.forum_id=forum.forum_id where subscribe.wizard_id=${
					req.params.id
				}`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	followerNumber: (req, res, next) => {
		req.app
			.get('db')
			.query(`select count(*) from follow where followed_id=${req.params.id}`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	followingNumber: (req, res, next) => {
		req.app
			.get('db')
			.query(`select count(*) from follow where follower_id=${req.params.id}`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	deletePostLike: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from likes where post_id=${req.params.id} and wizard_id=${
					req.session.user.wizard_id
				}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	addPostLike: (req, res, next) => {
		req.app
			.get('db')
			.likes.insert({
				post_id: req.params.id,
				wizard_id: req.session.user.wizard_id
			})
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	deleteCommentLike: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from comment_likes where comment_id=${
					req.params.id
				} and wizard_id=${req.session.user.wizard_id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	addCommentLike: (req, res, next) => {
		req.app
			.get('db')
			.likes.insert({
				comment_id: req.params.id,
				wizard_id: req.session.user.wizard_id
			})
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};

module.exports = {
	getUser: (req, res, next) => {
		res.status(200).json(req.session.user);
	},
	getNews: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from (select distinct count(*) as likes, forum_post.post_id from subscribe full join forum_post on forum_post.forum_id=subscribe.forum_id join wizards on wizards.wizard_id=forum_post.wizard_id left join likes on likes.post_id=forum_post.post_id where subscribe.wizard_id=${
					req.params.id
				} and forum_post.wizard_id!=${
					req.params.id
				} and length(forum_post.gif)>5 group by forum_post.post_id order by likes desc) as news join forum_post on forum_post.post_id=news.post_id join wizards on forum_post.wizard_id=wizards.wizard_id join forum on forum.forum_id=forum_post.forum_id order by time desc, likes desc
				`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getWizard: (req, res, next) => {
		req.app
			.get('db')
			.query(`select * from wizards where wizard_id=${req.params.id}`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	addPoints: (req, res, next) => {
		req.app
			.get('db')
			.house_points.insert(req.body)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getPostMentions: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from forum_post join wizards on wizards.wizard_id=forum_post.wizard_id where upper(title) like '%${req.query.input.toUpperCase()}%' or upper(post) like '%${req.query.input.toUpperCase()}%' order by time desc`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getCommentMentions: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from wizard_comment join wizards on wizards.wizard_id=wizard_comment.wizard_id where upper(comment) like '%${req.query.input.toUpperCase()}%' order by time desc`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getWizardMentions: (req, res, next) => {
		// console.log(req.query.input.toUpperCase());
		req.app
			.get('db')
			.query(
				`select * from wizards where upper(email) like '%${req.query.input.toUpperCase()}%' or upper(username) like '%${req.query.input.toUpperCase()}%' or upper(house) like '%${req.query.input.toUpperCase()}%' or upper(role) like '%${req.query.input.toUpperCase()}%' order by username`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getAuxPoints: (req, res, next) => {
		req.app
			.get('db')
			.query('select sum(points),house from house_points group by house')
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	}
};

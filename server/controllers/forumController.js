module.exports = {
	getPosts: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from (select count(*) as likes,post_id from likes group by post_id) as super join forum_post on super.post_id=forum_post.post_id join wizards on wizards.wizard_id=forum_post.wizard_id where forum_post.forum_id=${
					req.params.id
				} order by time,likes desc`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getLikes: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select count(*) as likes, post_id from likes where post_id=${
					req.params.postid
				} group by post_id`
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getForums: (req, res, next) => {
		req.app
			.get('db')
			.query(`select * from forum`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getForum: (req, res, next) => {
		req.app
			.get('db')
			.query(`select * from forum where forum_id=${req.params.id}`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	}
};

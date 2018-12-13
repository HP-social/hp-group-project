module.exports = {
	getUser: (req, res, next) => {
		res.status(200).json(req.session.user);
	},
	getNews: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from (select count(*) as likes,forum_post.post_id from subscribe join forum_post on forum_post.forum_id=subscribe.forum_id join wizards on wizards.wizard_id=forum_post.wizard_id right join likes on likes.post_id=forum_post.post_id where subscribe.wizard_id=${
					req.params.id
				} group by forum_post.post_id order by likes desc) as news join forum_post on forum_post.post_id=news.post_id join wizards on forum_post.wizard_id=wizards.wizard_id 
				union all
				select * from (select count(*) as likes,forum_post.post_id from follow join forum_post on forum_post.wizard_id=follow.followed_id join wizards on wizards.wizard_id=forum_post.wizard_id right join likes on likes.post_id=forum_post.post_id where follow.follower_id=${
					req.params.id
				} group by forum_post.post_id order by likes desc) as news join forum_post on forum_post.post_id=news.post_id join wizards on forum_post.wizard_id=wizards.wizard_id order by time desc, likes desc`
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
	}
};

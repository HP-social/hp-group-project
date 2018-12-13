module.exports = {
	getUser: (req, res, next) => {
		res.status(200).json(req.session.user);
	},
	getNews: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select distinct like_table.likes,forum_post.gif,forum_post.title,forum.location,forum_post.post_id,forum_post.forum_id,forum_post.wizard_id,forum_post.post,forum_post.time,wizards.username,wizards.house,wizards.role,wizards.profile_img from forum_post join wizards on wizards.wizard_id=forum_post.wizard_id join subscribe on subscribe.forum_id=forum_post.forum_id join forum on forum.forum_id=forum_post.forum_id join follow on follow.followed_id=forum_post.wizard_id join (select count(*)as likes, post_id from likes group by post_id) as like_table on like_table.post_id=forum_post.post_id where follow.follower_id=${
					req.params.id
				} or subscribe.wizard_id=${
					req.params.id
				} order by forum_post.time desc, like_table.likes desc`
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

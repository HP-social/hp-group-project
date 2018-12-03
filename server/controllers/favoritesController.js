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
	}
};

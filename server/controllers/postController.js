module.exports = {
	deletePost: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`delete from forum_post 
                where post_id=${req.params.id}`
			)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	updatePost: (req, res, next) => {
		// console.log(req.body);
		req.app
			.get('db')
			.forum_post.save(req.body)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	},
	makePost: (req, res, next) => {
		req.app
			.get('db')
			.forum_post.insert(req.body)
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).send(err));
	}
};

module.exports = {
	checkFriends: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select * from follow where follower_id in (${req.params.userid},${
					req.params.wizardid
				}) and followed_id in (${req.params.userid},${req.params.wizardid})
      `
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getFriends: (req, res, next) => {
		req.app
			.get('db')
			.query(
				`select one.followed_id,wizards.username,wizards.house,wizards.profile_img from follow as one full join follow on one.followed_id=follow.follower_id join wizards on one.followed_id=wizards.wizard_id where one.follower_id=${
					req.params.id
				} and one.follower_id=follow.followed_id
    `
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	}
};

module.exports = {
	getUser: (req, res, next) => {
		req.app
			.get('db')
			.query(`select * from wizards where wizard_id=${req.params.id}`)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	}
	// ,
	// getHome: (req, res, next) => {
	// 	req.app
	// 		.get('db')
	// 		.query(`select * from wizards where wizard_id=${req.params.id}`)
	// 		.then((result) => {
	// 			res.status(200).json(result);
	// 		})
	// 		.catch((err) => res.status(500).send(err));
	// }
};

module.exports = {
	getQuestions: (req, res, next) => {
		req.app
			.get('db')
			.query('select * from sorting_hat_questions order by question_id')
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	},
	getAnswers: (req, res, next) => {
		req.app
			.get('db')
			.query('select * from sorting_hat_answers')
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => res.status(500).send(err));
	}
};

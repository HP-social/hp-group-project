const axios = require('axios');
const SET_USER = 'SET_USER';

const initialState = {
	user: {},
	forumPosts: [],
	followed: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case `${SET_USER}_FULFILLED`:
			// return Object.assign({}, state, { user: action.payload });
			return { ...state, user: action.payload };
		default:
			return state;
	}
}

export function setArchetypes() {
	return {
		type: SET_USER,
		payload: axios.get('/api/user').then((response) => {
			return response.data;
		})
	};
}

export default reducer;

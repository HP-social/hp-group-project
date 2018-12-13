const axios = require('axios');
const SET_USER = 'SET_USER';
const PPL_YOU_FOLLOW = 'PPL_YOU_FOLLOW';
const FOLLOWING_YOU = 'FOLLOWING_YOU';
const DAILY_PROPHET = 'DAILY_PROPHET';
const MENTIONS = 'MENTIONS';

const initialState = {
	user: {},
	forumPosts: [],
	followed: [],
	// placeholder for navbar
	dailyProphetCount: [],
	messagesCount: [],
	mentionsCount: [],
	//
	youFollow: { count: 0 },
	followingYou: { count: 0 }
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case `${SET_USER}_FULFILLED`:
			// return Object.assign({}, state, { user: action.payload });
			return { ...state, user: action.payload };
		case `${PPL_YOU_FOLLOW}_FULFILLED`:
			return { ...state, youFollow: action.payload };
		case `${FOLLOWING_YOU}_FULFILLED`:
			return { ...state, followingYou: action.payload };
		case `${DAILY_PROPHET}_FULFILLED`:
			return { ...state, dailyProphetCount: action.payload };
		case `${MENTIONS}_FULFILLED`:
			return { ...state, mentionsCount: action.payload };
		default:
			return state;
	}
}

export function setUser() {
	return {
		type: SET_USER,
		payload: axios.get('/api/user').then((response) => {
			return response.data;
		})
	};
}
export function peopleYouFollow(id) {
	return {
		type: PPL_YOU_FOLLOW,
		payload: axios.get(`/api/followernumber/${id}`).then((response) => {
			return response.data[0];
		})
	};
}
export function peopleFollowingYou(id) {
	return {
		type: FOLLOWING_YOU,
		payload: axios.get(`/api/followingnumber/${id}`).then((response) => {
			return response.data[0];
		})
	};
}
export function dailyProphet(id) {
	return {
		type: DAILY_PROPHET,
		payload: axios.get(`/api/news/${id}`).then((response) => {
			return response.data;
		})
	};
}
export function getMessages(id) {
	return {
		type: MENTIONS,
		payload: axios.get(`/api/news/${id}`).then((response) => {
			return response.data;
		})
	};
}

export default reducer;

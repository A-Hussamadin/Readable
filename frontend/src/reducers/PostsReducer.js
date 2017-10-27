import {
	FETCH_POSTS,
	FETCH_CATEGORY_POSTS,
	POST_DETAILS,
	POST_VOTE,
	DELETE_POST,
	CREATE_POST,
	EDIT_POST,
	SORT_POSTS
} from '../actions/posts_actions';
import _ from 'lodash';

function sortPost(state, sortType) {
	switch (sortType) {
		case 'score_high':
			return _.orderBy(state, ['voteScore'], ['desc']);

		case 'score_low':
			return _.orderBy(state, ['voteScore'], ['asc']);

		case 'date_new':
			return _.orderBy(state, ['timestamp'], ['desc']);

		case 'date_old':
			return _.orderBy(state, ['timestamp'], ['asc']);
		default:
			return state;
	}
}

export default function(state = [], action) {
	let newState = [];
	switch (action.type) {
		case FETCH_POSTS:
			return _.orderBy(action.posts, ['voteScore'], ['desc']);

		case FETCH_CATEGORY_POSTS:
			return state.filter(post => {
				return post.category === action.category;
			});

		case CREATE_POST:
			return [...state, action.post];

		case POST_DETAILS:
			return [action.post];

		case EDIT_POST:
			return state.map(post => {
				return post.id === action.post.id ? (post = action.post) : post;
			});

		case POST_VOTE:
			newState = state.map(post => {
				return post.id === action.post.id ? (post = action.post) : post;
			});
			return _.orderBy(newState, ['voteScore'], ['desc']);

		case DELETE_POST:
			return state.filter(post => {
				return post.id !== action.post.id;
			});

		case SORT_POSTS:
			return sortPost(state, action.sortType);
		default:
			return state;
	}
}

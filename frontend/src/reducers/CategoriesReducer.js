import { FETCH_CATEGORIES } from '../actions/posts_actions';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
}

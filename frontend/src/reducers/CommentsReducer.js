import {
	CREATE_COMMENT,
	VOTE_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT
} from '../actions/comments_actions';
import { POST_COMMENTS } from '../actions/posts_actions';
import _ from 'lodash';

export default function(state = [], action) {
	switch (action.type) {
		case POST_COMMENTS:
			const unfilters = _.concat(state, action.comments);
			const newState = _.uniqWith(unfilters, _.isEqual);
			return _.orderBy(newState, ['voteScore'], ['desc']);

		case CREATE_COMMENT:
			return [...state, action.comment];

		case VOTE_COMMENT:
			const unsortedState = state.map(comment => {
				return comment.id === action.comment.id
					? (comment = action.comment)
					: comment;
			});

			return _.orderBy(unsortedState, ['voteScore'], ['desc']);

		case EDIT_COMMENT:
			return state.map(comment => {
				return comment.id === action.comment.id
					? (comment = action.comment)
					: comment;
			});

		case DELETE_COMMENT:
			return state.filter(comment => {
				return comment.id !== action.comment.id;
			});

		default:
			return state;
	}
}

import * as CommentsAPI from '../utils/comments_api';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const createComment = values => dispatch =>
	CommentsAPI.createComment(values).then(response => {
		const comment = response;
		dispatch({
			type: CREATE_COMMENT,
			comment
		});
	});

export const commentVote = (id, option) => dispatch =>
	CommentsAPI.commentVote(id, option).then(comment => {
		dispatch({
			type: VOTE_COMMENT,
			comment
		});
	});

export const editComment = values => dispatch =>
	CommentsAPI.editComment(values).then(response => {
		const comment = response;
		dispatch({
			type: EDIT_COMMENT,
			comment
		});
	});
export const deleteComment = id => dispatch =>
	CommentsAPI.deleteComment(id).then(comment => {
		dispatch({
			type: DELETE_COMMENT,
			comment
		});
	});

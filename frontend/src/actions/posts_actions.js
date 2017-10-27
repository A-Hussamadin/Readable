import * as PostsAPI from '../utils/posts_api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const POST_DETAILS = 'POST_DETAILS';
export const CREATE_POSTS = 'CREATE_POSTS';
export const POST_VOTE = 'POST_VOTE';
export const DELETE_POST = 'DELETE_POST';
export const POST_COMMENTS = 'POST_COMMENTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const SORT_POSTS = 'SORT_POSTS';

export function fetchPosts(selectedCategory) {
	return dispatch => {
		PostsAPI.fetchPosts(selectedCategory)
			.then(posts =>
				Promise.all(
					posts.map(post =>
						PostsAPI.fetchPostComments(post.id)
							.then(comments =>
								dispatch({
									type: POST_COMMENTS,
									comments
								})
							)
							.then(() => post)
					)
				)
			)
			.then(posts => dispatch({ type: FETCH_POSTS, posts }));
	};
}

export function postDetails(id) {
	return dispatch => {
		PostsAPI.postDetails(id)
			.then(post =>
				PostsAPI.fetchPostComments(post.id)
					.then(comments =>
						dispatch({
							type: POST_COMMENTS,
							comments
						})
					)
					.then(() => post)
			)
			.then(post => dispatch({ type: POST_DETAILS, post }));
	};
}

export const createPost = values => dispatch =>
	PostsAPI.createPost(values).then(response => {
		const post = response;
		dispatch({
			type: CREATE_POST,
			post
		});
	});

export const editPost = values => dispatch =>
	PostsAPI.editPost(values).then(response => {
		const post = response;
		dispatch({
			type: EDIT_POST,
			post
		});
	});

//export const createPost =()

export const fetchCategories = () => dispatch =>
	PostsAPI.fetchCategories().then(response => {
		const categories = response.categories;
		dispatch({
			type: FETCH_CATEGORIES,
			categories
		});
	});

export const postVote = (id, option) => dispatch =>
	PostsAPI.postVote(id, option).then(post => {
		dispatch({
			type: POST_VOTE,
			post
		});
	});

export const deletePost = id => dispatch =>
	PostsAPI.deletePost(id).then(post => {
		dispatch({
			type: DELETE_POST,
			post
		});
	});

export const sortPosts = sortType => dispatch => {
	return dispatch({
		type: SORT_POSTS,
		sortType
	});
};

const ROOT_URL = 'http://localhost:3001';

let token = localStorage.token;
if (!token)
	token = localStorage.token = Math.random()
		.toString(36)
		.substr(-8);
const headers = {
	Accept: 'application/json',
	Authorization: token
};

export function fetchPosts(selectedCategory) {
	let url = '';

	if (!selectedCategory) {
		url = `${ROOT_URL}/posts`;
	} else {
		url = `${ROOT_URL}/${selectedCategory}/posts`;
	}

	return fetch(url, {
		headers
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
}

export function postDetails(id) {
	const url = `${ROOT_URL}/posts/${id}`;

	return fetch(url, {
		headers
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
}

export function postVote(id, option) {
	//console.log('post Vote', option);
	const url = `${ROOT_URL}/posts/${id}`;

	return fetch(url, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
}

export function deletePost(id) {
	//console.log('post delete', id);
	const url = `${ROOT_URL}/posts/${id}`;
	return fetch(url, {
		method: 'DELETE',
		headers: {
			...headers
		}
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
}

export function fetchPostComments(id) {
	const url = `${ROOT_URL}/posts/${id}/comments`;
	return fetch(url, {
		headers
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
}
export const fetchCategories = () =>
	fetch(`${ROOT_URL}/categories`, {
		headers
	}).then(response => response.json());

export const createPost = values => {
	const url = `${ROOT_URL}/posts/`;

	console.log('Create Post Values ', values);
	return fetch(url, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...values
		})
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
};

export const editPost = values => {
	const url = `${ROOT_URL}/posts/${values.id}`;

	//console.log('Create Post Values ', values);
	return fetch(url, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...values
		})
	})
		.then(response => response.json())
		.catch(function(error) {
			console.log(
				'There has been a problem with your fetch operation: ' + error.message
			);
		});
};

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

export const createComment = values => {
	const url = `${ROOT_URL}/comments/`;

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

export const editComment = values => {
	const url = `${ROOT_URL}/comments/${values.id}`;

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

export function commentVote(id, option) {
	//console.log('post Vote', option);
	const url = `${ROOT_URL}/comments/${id}`;

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

export function deleteComment(id) {
	//console.log('post delete', id);
	const url = `${ROOT_URL}/comments/${id}`;
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

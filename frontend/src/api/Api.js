const API_URL = 'http://localhost:3000';

const POST_TOKEN = (body) => {
	return {
		url: API_URL + '/cliente/auth',
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}
	};
};

const POST_VALIDATE_TOKEN = (token) => {
	return {
		url: API_URL + '/token/validate',
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		}
	};
};

const GET_USER = (token) => {
	return {
		url: API_URL + '/cliente/get',
		options: {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token
			}
		}
	};
};

const GET_SESSAO_BY_ID = (id) => {
	return {
		url: API_URL + '/sessao/get/' + id,
		options: {
			method: 'GET'
		}
	};
};

export { POST_TOKEN, GET_USER, POST_VALIDATE_TOKEN, GET_SESSAO_BY_ID };

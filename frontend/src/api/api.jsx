const API_URL = 'https://escola-website-production.up.railway.app';

// Login
const POST_TOKEN = (body) => {
	return {
		url: API_URL + '/admin/auth',
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
		url: API_URL + '/admin/get',
		options: {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token
			}
		}
	};
};

const POST_CREATE_USER = (body) => {
	return {
		url: API_URL + '/admin/create',
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}
	};
};

const POST_CREATE_PAGINA = (body) => {
	return {
		url: API_URL + '/pagina/create',
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		}
	};
};

const PUT_UPDATE_PAGINA = (body) => {
	return {
		url: API_URL + '/pagina/update',
		options: {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		}
	};
};

const DELETE_DELETE_PAGINA = (paginaId) => {
	return {
		url: API_URL + '/pagina/delete/' + paginaId,
		options: {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			},
		}
	};
}

const GET_PAGINAS = () => {
	return {
		url: API_URL + '/pagina/get',
		options: {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			}
		}
	};
};


const GET_PAGINA_BY_NOME = (nome) => {
	return {
		url: API_URL + '/pagina/get/nome/' + nome,
		options: {
			method: 'GET'
		}
	};
}

export {
	POST_TOKEN,
	GET_USER,
	POST_VALIDATE_TOKEN,
	POST_CREATE_USER,
	POST_CREATE_PAGINA,
	GET_PAGINAS,
	PUT_UPDATE_PAGINA,
	DELETE_DELETE_PAGINA,
	GET_PAGINA_BY_NOME
};

const API_URL = 'http://localhost:3000';

const getSessaoById = (id) => {
	return {
		url: API_URL + '/sessao/get/' + id,
		options: {
			method: 'GET'
		}
	};
};

export {
  getSessaoById
}
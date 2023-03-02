import React from 'react';
import useFetch from '../hooks/useFetch';
import { GET_PAGINA_BY_NOME } from '../api/api';
import { useParams } from 'react-router-dom';
import Loading from '../helpers/Loading'

function HomePage() {

	const { nome } = useParams();
	const { loading, data, error, request } = useFetch();

	React.useEffect(() => {
		const getData = async () => {
			const { url, options } = GET_PAGINA_BY_NOME(nome);
			await request(url, options);
		};

		getData();
	}, [nome]);

  if (loading) return <Loading />
	if (data)
		return <div dangerouslySetInnerHTML={{ __html: data.conteudo }}></div>;
}

export default HomePage;

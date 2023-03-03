import React from 'react';
import styles from './FunctionsPage.module.css';

import lapis from '../img/icons/lapis.svg';
import quadrado from '../img/icons/quadrado.svg';
import grupo from '../img/icons/grupo.svg';
import layers from '../img/icons/layers.svg';
import useFetch from '../hooks/useFetch';
import { GET_PAGINA_BY_NOME } from '../api/api';
import Loading from '../helpers/Loading';
import { ReactComponent as Imagem } from '../img/func.svg';

function FunctionPage() {
	const { loading, data, error, request } = useFetch();

	React.useEffect(() => {
		const getData = async () => {
			const { url, options } = GET_PAGINA_BY_NOME('funcionalidades');
			await request(url, options);
		};

		getData();
	}, []);

	if (loading) return <Loading />;
	return (
		<section className={styles.function}>
			<div>
				<Imagem style={{ maxWidth: '600px' }} />
			</div>
			<div>
				<div className={styles.title}>
					<h1>
						Funcionalidades<span>.</span>
					</h1>
					{data && data.conteudo && (
						<div
							className={styles.container}
							dangerouslySetInnerHTML={{ __html: data.conteudo }}
						></div>
					)}
				</div>
			</div>
		</section>
	);
}

export default FunctionPage;

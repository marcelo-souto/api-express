import React from 'react';
import styles from './LandingPage.module.css';

import rectangle from '../img/rectangle.svg';
import professor from '../img/professor.svg';

import { GET_PAGINA_BY_NOME } from '../api/api';
import useFetch from '../hooks/useFetch';
import Loading from '../helpers/Loading'

function LandingPage() {
	const { loading, data, error, request } = useFetch();

	React.useEffect(() => {
		const getData = async () => {
			const { url, options } = GET_PAGINA_BY_NOME('sobre');
			await request(url, options);
		};

		getData();
	}, []);

	if (loading) return <Loading />;
	return (
		<div className={styles.landingBg}>
			<div className={styles.cover}>
				<img
					src={professor}
					alt=''
				/>

				<div className={styles.landingPage}>
					<img
						src={rectangle}
						alt=''
					/>
					<div className={styles.title}>
						<h1>
							Sobre a Elite<span>.</span>
						</h1>
					</div>
					{data && data.conteudo && (
						<div
							className={styles.container}
							dangerouslySetInnerHTML={{ __html: data.conteudo }}
						></div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LandingPage;

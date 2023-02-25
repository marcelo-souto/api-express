import React from 'react';
import criarAssentos from '../functions/criarAssentos';
import { sessao } from '../api/sessaoExemplo';
import styles from './Sessao.module.css';
import SideBarMenu from '../components/Sessao/SideBarMenu';
import { GET_SESSAO_BY_ID } from '../api/Api';
import useFetch from '../hooks/useFetch';
import Head from '../components/Helpers/Head';
import titulo from '../functions/titulo';
import { Routes, Route } from 'react-router-dom';
import SessaoEscolhaAssento from '../components/Sessao/SessaoEscolhaAssento';
import SessaoEscolhaTipo from '../components/Sessao/SessaoEscolhaTipo';

function Sessao() {
	const { loading, data, error, request } = useFetch();

	const [assentos, setAssentos] = React.useState(null);
	const [assentosOcupados, setAssentosOcupados] = React.useState(null);
	const [assentosEscolhidos, setAssentosEscolhidos] = React.useState([]);

	React.useEffect(() => {
		const getData = async () => {
			const { url, options } = GET_SESSAO_BY_ID(1);
			await request(url, options);
		};

		getData();

		if (sessao) {
			const {
				sala: { totalAssentos, totalFilas },
				assentos: { ocupados }
			} = sessao;
			const assentosCriados = criarAssentos({ totalFilas, totalAssentos });

			setAssentos(assentosCriados);
			setAssentosOcupados(ocupados);
		}
	}, [request]);

	if (loading) return <p>Carregando ...</p>;
	if (error) return <p>{error}</p>;
	if (data)
		return (
			<div className={styles.container}>
				<Head titulo={`Sessao | ${titulo(data.filme.nome)}`} />
				<SideBarMenu
					{...data}
					setAssentosEscolhidos={setAssentosEscolhidos}
					assentosEscolhidos={assentosEscolhidos}
				/>
				<Routes>
					<Route
						path='/'
						element={
							<SessaoEscolhaAssento
								assentosEscolhidos={assentosEscolhidos}
								setAssentosEscolhidos={setAssentosEscolhidos}
								assentosOcupados={assentosOcupados}
								assentos={assentos}
								sala={sessao.sala}
							/>
						}
					/>
					<Route
						path='/ingressos'
						element={
							<SessaoEscolhaTipo
								preco={data.preco}
								assentosEscolhidos={assentosEscolhidos}
								setAssentosEscolhidos={setAssentosEscolhidos}
							/>
						}
					/>
				</Routes>
			</div>
		);
}

export default Sessao;

import React from 'react';
import Sala from '../components/Sessao/Sala';
import criarAssentos from '../functions/criarAssentos';
import { sessao } from '../api/sessaoExemplo';
import styles from './Sessao.module.css';
import SideBarMenu from '../components/Sessao/SideBarMenu';
import { getSessaoById } from '../api/Api';
import useFetch from '../hooks/useFetch';
import Head from '../components/Helpers/Head'
import titulo from '../functions/titulo'

function Sessao() {
	const { loading, data, error, request } = useFetch();

	const [assentos, setAssentos] = React.useState(null);
	const [assentosOcupados, setAssentosOcupados] = React.useState(null);
	const [assentosEscolhidos, setAssentosEscolhidos] = React.useState([]);

	React.useEffect(() => {

		const getData = async () => {
			const { url, options } = getSessaoById(8);
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
					assentosEscolhidos={assentosEscolhidos}
				/>
				<div>
					<div className={styles.title}>
						<p>Escolha seus assentos:</p>
					</div>
					<Sala
						assentosOcupados={assentosOcupados}
						assentos={assentos}
						sala={sessao.sala}
						setAssentosEscolhidos={setAssentosEscolhidos}
						assentosEscolhidos={assentosEscolhidos}
					/>
				</div>
			</div>
		);
}

export default Sessao;

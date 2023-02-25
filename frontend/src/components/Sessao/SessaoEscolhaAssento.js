import Sala from './Sala';
import styles from './SessaoEscolhaAssento.module.css'

const SessaoEscolhaAssento = ({
	assentos,
	assentosEscolhidos,
	setAssentosEscolhidos,
	assentosOcupados,
  sala
}) => {
	return (
		<div className='comeFromRight'>
			<div className={styles.title}>
				<p>Escolha seus assentos:</p>
			</div>
			<Sala
				assentosOcupados={assentosOcupados}
				assentos={assentos}
				sala={sala}
				setAssentosEscolhidos={setAssentosEscolhidos}
				assentosEscolhidos={assentosEscolhidos}
			/>
		</div>
	);
};

export default SessaoEscolhaAssento
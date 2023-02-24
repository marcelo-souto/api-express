import styles from './Assento.module.css';

function Assento({ codigo, disponivel, onClick, ativo }) {
	return (
		<button
			disabled={!disponivel}
			onClick={onClick}
			className={`${styles.assento} ${ativo && styles.ativo} ${
				disponivel ? styles.disponivel : styles.ocupado
			}`}
		>
			{codigo}
		</button>
	);
}

export default Assento;

import styles from './SideBarMenuButton.module.css';
import { NavLink } from 'react-router-dom';

function SideBarMenuButton({ texto, icone, onClick, assentosEscolhidos, link }) {
	return (
		<NavLink to={link}
			onClick={onClick}
			className={styles.botao}
		>
			{icone}
			{texto}
			{assentosEscolhidos && (
				<div className={styles.assentos}>
					{assentosEscolhidos.map((assento) => {
						return <p className={styles.assento}>{assento}</p>;
					})}
				</div>
			)}
		</NavLink>
	);
}

export default SideBarMenuButton;

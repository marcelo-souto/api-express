import styles from './SideBarMenuButton.module.css';
import { NavLink } from 'react-router-dom';

function SideBarMenuButton({
	texto,
	icone,
	onClick,
	assentosEscolhidos,
	link,
	desabilitado
}) {
	return (
		<NavLink
			to={link}
			onClick={onClick}
			className={`${styles.botao} ${desabilitado ? styles.desabilitado : ''} ${
				desabilitado && link === '/' ? styles.poltrona : ''
			}`}
		>
			{icone}
			{texto}
			{assentosEscolhidos && assentosEscolhidos.length > 0 && (
				<div className={styles.assentos}>
					{assentosEscolhidos.map((assento, index) => {
						return (
							<p
								key={assento + index}
								className={styles.assento}
							>
								{assento.assento}
							</p>
						);
					})}
				</div>
			)}
		</NavLink>
	);
}

export default SideBarMenuButton;

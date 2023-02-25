import React from 'react';
import styles from './SideBarMenuFilmeInfo.module.css';
import { ReactComponent as LixeiraIcone } from '../../img/lixeira-icone.svg';
import { useNavigate } from 'react-router-dom';

function SideBarMenuFilmeInfo({ filme, setAssentosEscolhidos }) {
	const navigate = useNavigate();

	function handleClick() {
		setAssentosEscolhidos([]);
		navigate('/');
	}

	return (
		<>
			<div className={styles.filmeInfo}>
				<img
					src={`${filme.poster.url}${filme.poster.img}`}
					alt={filme.poster.alt}
				/>
				<p className={styles.filmeNome}>{filme.nome}</p>
			</div>
			<button
				className={styles.botao}
				onClick={handleClick}
			>
				<LixeiraIcone />
				Remover tudo
			</button>
		</>
	);
}

export default SideBarMenuFilmeInfo;

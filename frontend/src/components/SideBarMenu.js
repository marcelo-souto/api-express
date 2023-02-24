import React from 'react';
import styles from './SideBarMenu.module.css';
import SideBarMenuButton from './SideBarMenuButton';

import { ReactComponent as LixeiraIcone } from '../img/lixeira-icone.svg';
import { ReactComponent as RetiradaIcone } from '../img/seta-icone.svg';

import { ReactComponent as PoltronaIcone } from '../img/poltrona-icone.svg';
import { ReactComponent as IngressoIcone } from '../img/ingresso-icone.svg';
import { ReactComponent as CartaoIcone } from '../img/cartao-icone.svg';

function SideBarMenu({ filme, assentosEscolhidos }) {
	return (
		<div className={styles.sideBarMenu}>
			<div className={styles.filmeInfo}>
				<img
					src={`${filme.poster.url}/${filme.poster.img}`}
					alt={filme.poster.alt}
				/>
				<p className={styles.filmeNome}>{filme.nome}</p>
			</div>
			<div className={styles.botoes}>
				<button className={styles.botao}>
					<RetiradaIcone />
					Formas de Retirada
				</button>
				<button className={styles.botao}>
					<LixeiraIcone />
					Remover
				</button>
			</div>
			<div className={styles.botoesGroup}>
				<SideBarMenuButton
					icone={<PoltronaIcone />}
					texto='escolha de assentos'
					assentosEscolhidos={assentosEscolhidos}
					link='/poltronas'
				/>
				<SideBarMenuButton
					icone={<IngressoIcone />}
					texto='tipos de ingressos'
					link='/ingressos'
				/>
				<SideBarMenuButton
					icone={<CartaoIcone />}
					texto='formas de pagamento'
					link='/pagamento'
				/>
			</div>
		</div>
	);
}

export default SideBarMenu;

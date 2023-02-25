import React from 'react'
import styles from './SideBarMenuGrupoBotoes.module.css'
import SideBarMenuButton from './SideBarMenuButton';

import { ReactComponent as PoltronaIcone } from '../../img/poltrona-icone.svg';
import { ReactComponent as IngressoIcone } from '../../img/ingresso-icone.svg';
import { ReactComponent as CartaoIcone } from '../../img/cartao-icone.svg';

function SideBarMenuGrupoBotoes({assentosEscolhidos}) {
  return (
    <div className={styles.botoesGroup}>
				<SideBarMenuButton
					icone={<PoltronaIcone />}
					texto='escolha de assentos'
					assentosEscolhidos={assentosEscolhidos}
					link='/'
				/>
				<SideBarMenuButton
					icone={<IngressoIcone />}
					texto='tipos de ingressos'
					desabilitado={assentosEscolhidos.length < 1}
					link='/ingressos'
				/>
				<SideBarMenuButton
					icone={<CartaoIcone />}
					texto='formas de pagamento'
					desabilitado={true}
					link='/pagamento'
				/>
			</div>
  )
}

export default SideBarMenuGrupoBotoes
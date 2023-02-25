import React from 'react';
import styles from './SideBarMenu.module.css';

import SideBarMenuResumoCompra from './SideBarMenuResumoCompra';
import SideBarMenuGrupoBotoes from './SideBarMenuGrupoBotoes';
import SideBarMenuFilmeInfo from './SideBarMenuFilmeInfo';

function SideBarMenu({ filme, preco, assentosEscolhidos, setAssentosEscolhidos }) {
	return (
		<div className={`${styles.sideBarMenu} comeFromLeft`}>
			<SideBarMenuFilmeInfo filme={filme} setAssentosEscolhidos={setAssentosEscolhidos} />
			<SideBarMenuGrupoBotoes assentosEscolhidos={assentosEscolhidos} />
			<SideBarMenuResumoCompra assentosEscolhidos={assentosEscolhidos} preco={preco}/>
		</div>
	);
}

export default SideBarMenu;

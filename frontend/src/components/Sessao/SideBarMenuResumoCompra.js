import React from 'react';
import styles from './SideBarMenuResumoCompra.module.css';
import calcularPreco from '../../functions/calcularPreco';

import { ReactComponent as MoedaIcone } from '../../img/moeda-icone.svg';
import { ReactComponent as IngressoIcone } from '../../img/ingresso-icone.svg';

function SessaoResumoCompra({ assentosEscolhidos, preco }) {
	return (
		<div>
			<div className={styles.resumo}>
				<p>Resumo do pedido</p>
			</div>
			<div className={styles.resumo}>
				<div className={styles.ingressos}>
					<div className={styles.icone}>
						<IngressoIcone width={28} />
					</div>
					<p>INGRESSOS</p>
					<ul>
						{assentosEscolhidos &&
							assentosEscolhidos.map(({ assento, tipo, nome }, index) => {

								return (
									<li
										className={styles.ingressoItem}
										key={assento + index}
									>
										<div>
											<p>{assento}</p>
											<p>{nome}</p>
										</div>
										<p>R$ {calcularPreco(preco, tipo)}</p>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
			<div className={`${styles.resumo} ${styles.pedido}`}>
				<div>
					<MoedaIcone width={24} />
				</div>
				<div>
					<p>Total taxa</p>
					<p>R$ 0.00</p>
				</div>
				<div>
					<p>Total</p>
					<p>R$ {assentosEscolhidos && assentosEscolhidos.reduce((prev, curr) => {
						return prev + Number(calcularPreco(preco, curr.tipo))
					}, 0).toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
}

export default SessaoResumoCompra;

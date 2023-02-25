import React from 'react';
import Assento from './Assento';
import styles from './Sala.module.css';

function Sala({
	assentosOcupados,
	assentos,
	sala,
	setAssentosEscolhidos,
	assentosEscolhidos
}) {
	function handleAssentosEscolhidos(codigo) {
		const assentoNaoEscolhido = !assentosEscolhidos.find(
			(assento) => assento.assento === codigo
		);

		if (assentoNaoEscolhido) {
			setAssentosEscolhidos([
				...assentosEscolhidos,
				{ assento: codigo, tipo: null }
			]);
		} else {
			setAssentosEscolhidos(
				assentosEscolhidos.filter((assento) => assento.assento !== codigo)
			);
		}
	}

	return (
		<div className={styles.sala}>
			<div
				className={styles.assentos}
				style={{
					gridTemplateColumns: `repeat(${Math.ceil(
						sala.totalAssentos / sala.totalFilas
					)}, 1fr)`
				}}
			>
				{assentos &&
					assentos.map((codigo, index) => {
						return (
							<Assento
								disponivel={!assentosOcupados.includes(codigo)}
								key={codigo + index}
								codigo={codigo}
								ativo={assentosEscolhidos.find((assento) => assento.assento === codigo)}
								onClick={() => handleAssentosEscolhidos(codigo)}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default Sala;

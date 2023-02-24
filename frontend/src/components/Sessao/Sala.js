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
		if (!assentosEscolhidos.includes(codigo)) {
			setAssentosEscolhidos([...assentosEscolhidos, codigo]);
		} else {
			setAssentosEscolhidos(
				assentosEscolhidos.filter((assento) => assento !== codigo)
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
								ativo={assentosEscolhidos.includes(codigo)}
								onClick={() => handleAssentosEscolhidos(codigo)}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default Sala;

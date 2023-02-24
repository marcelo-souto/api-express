function criarAssentos({ totalFilas, totalAssentos }) {
	let assentos = [];

	for (let i = 1; i <= totalFilas; i++) {
		const letra = String.fromCharCode(64 + i);

		let assentos_por_fila = Math.ceil(totalAssentos / totalFilas);

		if (i === totalFilas && (assentos_por_fila * i) % totalAssentos > 0) {
			assentos_por_fila -= (assentos_por_fila * i) % totalAssentos;
		}

		for (let j = 1; j <= assentos_por_fila; j++) {
			const numero = j < 10 ? '0' + j : j;
			const codigo = letra + numero;

			assentos.push(codigo);
		}
	}

	return assentos;
}

// console.log(criarAssentos({ totalFilas: 5, totalAssentos: 81 }));

export default criarAssentos;

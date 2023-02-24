// const quantidade_assentos = 98;
// const quantidade_filas = 5;
// const assentos_por_fila = quantidade_assentos / quantidade_filas;

// let assentos = [];

// for (let i = 1; i <= quantidade_filas; i++) {
// 	const letra = String.fromCharCode(64 + i);

// 	for (let j = 1; j <= assentos_por_fila; j++) {
// 		const numero = j < 10 ? '0' + j : j;
// 		const codigo = letra + numero;
// 		assentos.push(codigo);
// 	}
// }

const quantidade_assentos = 100;
const quantidade_filas = 5;

let assentos = [];

for (let i = 1; i <= quantidade_filas; i++) {
	const letra = String.fromCharCode(64 + i);

  let assentos_por_fila = Math.ceil(quantidade_assentos / quantidade_filas)

  if (i === quantidade_filas && (assentos_por_fila * i) % quantidade_assentos > 0) {
    assentos_por_fila -= (assentos_por_fila * i) % quantidade_assentos
  }

	for (let j = 1; j <= assentos_por_fila; j++) {
    
		const numero = j < 10 ? '0' + j : j;
		const codigo = letra + numero;
		assentos.push(codigo);
	}
}

// console.log(assentos)
// =================================================================================================

const numeros_aleatorios = [...Array(quantidade_assentos)].map(() =>
	Math.floor(Math.random() * quantidade_assentos)
);

const assentos_ocupados = assentos.filter((assento, index) => numeros_aleatorios.includes(index))
const assentos_livres = assentos.filter((assento) => !assentos_ocupados.includes(assento));

const visao_geral = assentos.map((assento) => {
	if (assentos_livres.includes(assento)) return { cod: assento, situacao: 'livre' };
	if (assentos_ocupados.includes(assento)) return { cod: assento, situacao: 'ocupado' };
});

console.log(assentos_ocupados)

const sessao = {
	assentos_livres: {
		codigos: assentos_livres,
		total: assentos_livres.length
	},
	assentos_ocupados: {
		codigos: assentos_ocupados,
		total: assentos_ocupados.length
	}
};

// console.log(sessao)

// ===============================================================================================

const ocupados = assentos_ocupados.reduce((prev, curr) => {

	let arr = assentos_ocupados
		.filter((assento) => assento.includes(curr[0]))
		.map((item) => item.slice(1, 3));

	return { ...prev, [curr[0]]: [...arr] };
}, {});

const livres = assentos_livres.reduce((prev, curr) => {

	let arr = assentos_livres
		.filter((assento) => assento.includes(curr[0]))
		.map((item) => item.slice(1, 3));

	return { ...prev, [curr[0]]: [...arr] };
}, {});

// console.log({ocupados, livres})
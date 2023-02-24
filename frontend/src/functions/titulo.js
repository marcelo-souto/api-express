// Funcao que retorna a string com a primeira letra maiuscula
// Funcao igual ao Capitalize

function titulo(str) {
	const tituloCapitalizado = str.charAt(0).toUpperCase() + str.slice(1);
	return tituloCapitalizado;
}

export default titulo;

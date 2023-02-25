function calcularPreco(preco, tipo) {

	if (!tipo) return null
	const tipoIngresso = tipo.split(' ')[0];
	preco = Number(preco);

	switch (tipoIngresso) {
		case 'meia':
			return (preco / 2).toFixed(2);
			break;
		case 'desconto':
			return (preco - preco * 0.25).toFixed(2);
			break;
		case 'inteira':
			return preco.toFixed(2);
			break;
	}
}

export default calcularPreco;

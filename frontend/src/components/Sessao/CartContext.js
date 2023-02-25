import React from 'react';

export const CartContext = React.createContext();

export const CartStorage = () => {
	const [assentosEscolhidos, setAssentosEscolhidos] = React.useState([]);

	const cart = {
		get: () => {
			return assentosEscolhidos;
		},
		add: (novoAssento) => {
			const { assento } = novoAssento;

			const assentoNaoEscolhido = !assentosEscolhidos.find(
				(item) => item.assento === assento
			);

			if (assentoNaoEscolhido)
				setAssentosEscolhidos([...assentosEscolhidos, assento]);
			else
				setAssentosEscolhidos(
					assentosEscolhidos.filter((item) => item.assento !== assento)
				);
		}
	};

	return <CartContext.Provider value={{ cart }}></CartContext.Provider>;
};

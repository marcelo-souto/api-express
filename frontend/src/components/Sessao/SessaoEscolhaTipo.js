import React from 'react';
import styles from './SessaoEscolhaTipo.module.css';
import InputSelect from '../Form/InputSelect';
import calcularPreco from '../../functions/calcularPreco';

// const options = ['meia', 'inteira', 'desconto'];

const options = [
	{ option: 'Meia Entrada Estudante', value: 'meia 1' },
	{ option: 'Meia Entrada Idoso', value: 'meia 2' },
	{ option: 'Inteira', value: 'inteira 1' },
	{ option: 'Desconto VIP', value: 'desconto 1' }
];

function SessaoEscolhaTipo({
	preco,
	assentosEscolhidos,
	setAssentosEscolhidos
}) {
	const handleChange = ({ value }, assento) => {
		const nomeIndex = options.findIndex((item) => item.value === value);

		let copia = [...assentosEscolhidos];

		const index = copia.findIndex((item) => item.assento === assento);


		if (index !== -1)
			copia[index] = {
				assento: assento,
				tipo: value,
				nome: nomeIndex !== -1 && options[nomeIndex].option
			};

		setAssentosEscolhidos([...copia]);
	};

	return (
		<div className='comeFromRight'>
			<div className={styles.title}>
				<p>Escolha os tipos de ingressos:</p>
			</div>
			<ul className={styles.opcoes}>
				{assentosEscolhidos.map(({ assento, tipo }) => {
					return (
						<li key={assento}>
							<div>
								<p
									className={`${styles.opcao} ${
										options.find(
											(item) => tipo !== '' && item.value.includes(tipo)
										)
											? styles.selecionado
											: ''
									}`}
								>
									{assento}
								</p>

								{tipo && (
									<p className={styles.preco}>
										<span>Preço:</span>R$ {calcularPreco(preco, tipo)}
									</p>
								)}
							</div>
							<InputSelect
								onChange={({ target }) => handleChange(target, assento)}
								options={options}
								tipo={tipo ? tipo : ''}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SessaoEscolhaTipo;

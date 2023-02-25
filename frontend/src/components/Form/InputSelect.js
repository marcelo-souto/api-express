import React from 'react';
import { Form } from 'react-bootstrap';

export default function InputSelect({ label, options, onChange, tipo }) {
	return (
		<div>
			<Form.Select
				style={{ width: 'max-content' }}
				aria-label={label}
				onChange={onChange}
				value={tipo}
			>
				<option value=''>Selecione</option>
				{options.map(({option, value}) => {
					return (
						<option
							key={option}
							value={value}
						>
							{option}
						</option>
					);
				})}
			</Form.Select>
		</div>
	);
}

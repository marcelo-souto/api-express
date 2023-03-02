import React from 'react';
import { ReactComponent as Icon } from '../img/success.svg'

function Success({ children, margin, fontSize }) {
	return (
		<p
			className='comeFromLeft'
			style={{
				color: '#37ad00',
				fontSize: fontSize ? `${fontSize}rem` : '0.875rem',
				margin: `${margin ? margin : 12}px 0px`,
				display: 'flex',
				alignItems: 'center',
				gap: '4px'
			}}
		>
			<Icon width={18} />{children}
		</p>
	);
}

export default Success;

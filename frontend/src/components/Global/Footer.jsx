import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { ReactComponent as Logo } from '../../img/layers.svg';

function Footer() {
	return (
		<footer className={`${styles.footerContainer}`}>
			<div>
				<Logo />
			</div>
			<div>
				<p>{new Date().getFullYear()}. Alguns direitos reservados.</p>
			</div>
		</footer>
	);
}

export default Footer;

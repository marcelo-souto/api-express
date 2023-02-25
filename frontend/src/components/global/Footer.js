import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerBg}>
      <div className={styles.footerLogo}>
        <div className="container">
          <Link to="">
            <img className={styles.logo} src={logo} alt="cine.com" />
          </Link>
        </div>
      </div>
      <div className={`container ${styles.footer}`}>
        <div>
          <h2 className={styles.info}>Precisa de ajuda?</h2>
          <ul>
            <li>
              <a href="email de contato">
                atendimento@cine.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.info}>Informações</h2>
          <ul>
            <li>
              <Link to="/">filmes</Link>
            </li>
            <li>
              <Link to="/">cinemas</Link>
            </li>
            <li>
              <Link to="/">promoções</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
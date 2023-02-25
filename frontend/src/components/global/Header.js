import React from "react";
import styles from "./Header.module.css";
import seta from "../../img/seta.svg";
import user from "../../img/user.svg";
import help from "../../img/help.svg"
import logo from "../../img/logo.svg"
import { Link } from "react-router-dom";

function Header() {
  return (
    /* Título, Logo e Links */
    <header className={styles.headerBg}>
      <div className={`${styles.header} max`}>
        <img className={styles.seta} src={seta} alt="seta" />
        <div className={styles.logo}>
        <Link to="">
            <img className={styles.logo} src={logo} alt="cine.com" />
          </Link>
        </div>
        <div className={styles.nav}>
            <a href="login">Olá, visitante</a>
            <img className={styles.user} src={user} alt="visitante" />
          <a href="contato">Ajuda</a>
          <img className={styles.help} src={help} alt="ajuda" />
        </div>
      </div>
    </header>
  );
}

export default Header;

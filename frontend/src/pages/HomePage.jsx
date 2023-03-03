import React from 'react'
import styles from './HomePage.module.css'
import { Button } from 'react-bootstrap'

import alunos from "../img/alunos.jpg"
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className={styles.homeBg}>
      <div className={`${styles.homePage} comeFromLeft`}>
        <h1>Plataforma de Gestão e Planejamento Online<span>.</span></h1>
        <h3>Nosso sistema oferece uma série de recursos e benefícios para
          facilitar o seu dia a dia, com praticidade e maior agilidade
          na tomada de decisões e organizações de notas.</h3>
          <Link to='sobre'>
        <Button variant="primary" size="s">
          Conhecer mais
        </Button>
          </Link>
      </div>
      <div className={styles.container}>
        <img src={alunos} alt="" />
      </div>
    </div>
  )
}

export default HomePage
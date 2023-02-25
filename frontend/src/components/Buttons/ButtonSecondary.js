import React from 'react'
import styles from './ButtonSecondary.module.css'

function ButtonSecondary({text, onClick, disabled}) {
  return (
    <button className={styles.buttonSecondary} disabled={disabled} onClick={onClick}>{text}</button>
    
  )
}

export default ButtonSecondary
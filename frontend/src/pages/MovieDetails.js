import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import APIKey from "../config/key";
import styles from "./MovieDetails.module.css";
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import ButtonSecondary from '../components/Buttons/ButtonSecondary';

function MovieDetails() {
    const { id } = useParams()
    const [filme, setfilme] = useState([])
  
    const imagePath = 'https://image.tmdb.org/t/p/w500/'
  
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=pt-BR`)
      .then(response => response.json())
      .then(data => {
        const {title, poster_path, release_date, overview} = data
        const filme = {
          id,
          title,
          image: `${imagePath}${poster_path}`,
          sinopse: overview,
          releaseDate: release_date,
        }
        setfilme(filme)
      })
    }, [id])
  
    return (
      <div className={styles.Container}>
        <div className={styles.filme}>
        <img src={filme.image} alt={filme.sinopse}/>
        <div className={styles.details}>
        <Link to="/">
          <ButtonSecondary text="voltar"/>
        </Link>
          <h1>{filme.title}</h1>
          <span>{filme.sinopse}</span>
            <Link to="sessao">
              <ButtonPrimary text="Comprar Ingressos"/>
              </Link>
        </div>
      </div>
      </div>
    );
  }
  
export default MovieDetails;
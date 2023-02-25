import React from "react";
import styles from "./MovieList.module.css";
import APIKey from "../config/key";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel.js"

function MovieList() {
  
    const [filmes, setFilmes] = useState([])
    const image_path = `https://image.tmdb.org/t/p/w500/`

    useEffect(() => {

        fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => setFilmes(data.results))

    }, [])

  return (

    <div className={styles.MovieListBg}>
      <div className={styles.MovieList}>
        <div className={`${styles.container} max`}>
        <Carousel />
        <h1>Lançamentos</h1>
        <div className={styles.listaFilmes}>
            {filmes.map(filmes => {
                return (
                    <listaFilmes key={filmes.id}>
               <Link to={`/details/${filmes.id}`}><img src={`${image_path}${filmes.poster_path}`} alt={filmes.title}></img></Link>
                    <span>{filmes.title}</span>
                    </listaFilmes>
                )
            })}
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default MovieList;
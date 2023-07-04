import { useState, useEffect } from 'react';
import {
  getUpcommingMovies,
  getMoviesOnCinema,
  getPopularMovies,
} from '../services/getMovies';

export default function useMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [moviesOnCinema, setMoviesOnCinema] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      getUpcommingMovies().then(data => setUpcomingMovies(data.results));
      getMoviesOnCinema().then(data => setMoviesOnCinema(data.results));
      getPopularMovies().then(data => setPopularMovies(data.results));
    }
    loadMovies();
  }, []);

  return {
    popularMovies,
    moviesOnCinema,
    upcomingMovies,
  };
}

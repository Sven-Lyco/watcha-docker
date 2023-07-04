import { useState, useEffect } from 'react';
import getMovieDetails from '../services/getMovieDetails';

export default function useMovieDetails(id: string | undefined) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieWatchProviders, setMovieWatchProviders] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const movieTrailerUrl = movieTrailer
    .filter(
      (video: any) =>
        video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser') &&
        video.size >= 720
    )
    .map(
      (video: any) => `https://www.youtube.com/watch?v=${video.key}wowK7ADGRsQ`
    );

  useEffect(() => {
    setIsLoading(true);
    async function loadMovieDetails() {
      getMovieDetails(id).then((data: any) => {
        setMovieDetails(data.movieDetails);
        setMovieCast(data.movieCredits.cast);
        setMovieWatchProviders(data.movieWatchProviders.results.DE);
        setSimilarMovies(data.similarMovies.results);
        setMovieTrailer(data.movieTrailer.results);
      });
    }
    loadMovieDetails();
    setIsLoading(false);
  }, [id]);

  return {
    movieTrailerUrl,
    similarMovies,
    movieWatchProviders,
    movieCast,
    movieDetails,
    isLoading,
  };
}

import useSWR from 'swr';
import {
  addWatchedMovies,
  deleteWatchedMovies,
  getWatchedMovies,
} from '../services/watchedMovies';
import { IWatchedMovies } from '../shared/types';

export default function useMovie() {
  const {
    data,
    error: watchedMoviesError,
    mutate: mutateWatchedMovies,
  } = useSWR('/api/watchedMovies', getWatchedMovies);

  const watchedMovies = data?.watchedMovies as IWatchedMovies[];

  async function handleCheckMovie(movieId: string | undefined, title: string) {
    const watchedMovie = { movieId, title };
    const isOnList = watchedMovies.some(
      (movie: any) => movie.movieId === watchedMovie.movieId
    );

    if (isOnList) {
      const filteredItems = watchedMovies.filter(
        (result: any) => result.movieId !== movieId
      );
      mutateWatchedMovies(filteredItems, false);
      const filteredItem = watchedMovies.find(
        (result: any) => result.movieId === movieId
      );
      const deleteId = filteredItem?._id;
      deleteWatchedMovies(deleteId);
      mutateWatchedMovies();
    }

    if (!isOnList) {
      mutateWatchedMovies([...watchedMovies, watchedMovie], false);

      addWatchedMovies(watchedMovie);

      mutateWatchedMovies();
    }
  }

  function checkIsMovieWatched(movieId: string | undefined) {
    const watchedMovie = { movieId };
    return watchedMovies?.some(
      (movie: any) => movie.movieId === watchedMovie.movieId
    );
  }

  return {
    watchedMoviesError,
    watchedMovies,
    handleCheckMovie,
    checkIsMovieWatched,
  };
}

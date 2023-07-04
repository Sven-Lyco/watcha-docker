import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';

import FetchError from './components/FetchError/FetchError';

import useSeries from './hooks/useSeries';
import useMovies from './hooks/useMovies';
import useToggle from './hooks/useToggle';
import useEpisodes from './hooks/useEpisodes';
import useWatchlist from './hooks/useWatchlist';

import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import SeriesPage from './pages/SeriesPage';
import MoviesPage from './pages/MoviesPage';
import SeriesDetailsPage from './pages/SeriesDetailsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import WatchlistPage from './pages/WatchlistPage';
import PersonDetailsPage from './pages/PersonDetailsPage';
import SearchPage from './pages/SearchPage';

export default function App(): JSX.Element {
  const { showTrailer, seenTitle, handleSetShowTrailer, handleSetSeenTitle } =
    useToggle();

  const { popularSeries, topRatedSeries, seriesOnTv } = useSeries();
  const { popularMovies, moviesOnCinema, upcomingMovies } = useMovies();

  const { checkIsEpisodeWatched, handleCheckEpisode, watchedEpisodesError } =
    useEpisodes();
  const {
    watchlist,
    checkIsOnWatchlist,
    handleDeleteItem,
    handleAddSeries,
    handleAddMovie,
  } = useWatchlist();

  if (!topRatedSeries || !popularSeries || !seriesOnTv || watchedEpisodesError)
    return <FetchError onClick={() => window.location.reload()} />;

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={
            <SettingsPage
              showTrailer={showTrailer}
              handleSetShowTrailer={handleSetShowTrailer}
              seenTitle={seenTitle}
              handleSetSeenTitle={handleSetSeenTitle}
            />
          }
        />
        <Route
          path="/serien"
          element={
            <SeriesPage
              popularSeries={popularSeries}
              topRatedSeries={topRatedSeries}
              seriesOnTv={seriesOnTv}
            />
          }
        />
        <Route
          path="serie/:id"
          element={
            <SeriesDetailsPage
              isShowTrailer={showTrailer}
              onHandleAddSeries={handleAddSeries}
              checkIsOnWatchlist={checkIsOnWatchlist}
              onHandleDeleteItem={handleDeleteItem}
              handleCheckEpisode={handleCheckEpisode}
              isEpisodeWatched={checkIsEpisodeWatched}
            />
          }
        />
        <Route
          path="/filme"
          element={
            <MoviesPage
              popularMovies={popularMovies}
              moviesOnCinema={moviesOnCinema}
              upcomingMovies={upcomingMovies}
            />
          }
        />
        <Route
          path="film/:id"
          element={
            <MovieDetailsPage
              isShowTrailer={showTrailer}
              onHandleAddMovie={handleAddMovie}
              checkIsOnWatchlist={checkIsOnWatchlist}
              onHandleDeleteItem={handleDeleteItem}
            />
          }
        />
        <Route path="suche" element={<SearchPage />} />
        <Route
          path="watchlist"
          element={
            <WatchlistPage watchlist={watchlist} seenTitle={seenTitle} />
          }
        />
        <Route path="person/:id" element={<PersonDetailsPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        transition={Bounce}
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

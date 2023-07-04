import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const { API_BASE_MOVIES_URL, API_KEY, API_LANGUAGE } = process.env;

router.get('/popular', async (req, res) => {
  const popularMoviesUrl = `${API_BASE_MOVIES_URL}/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&region=DE`;
  const fetchPopularMoviesResponse = await fetch(popularMoviesUrl);
  const popularMovies = await fetchPopularMoviesResponse.json();
  res.send(popularMovies);
});

router.get('/upcoming', async (req, res) => {
  const upcomingMoviesUrl = `${API_BASE_MOVIES_URL}/upcoming?api_key=${API_KEY}&language=${API_LANGUAGE}&region=DE`;
  const fetchUpcommingMoviesResponse = await fetch(upcomingMoviesUrl);
  const upcomingMovies = await fetchUpcommingMoviesResponse.json();
  res.send(upcomingMovies);
});

router.get('/now-playing', async (req, res) => {
  const nowPlayingUrl = `${API_BASE_MOVIES_URL}/now_playing?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchResponse = await fetch(nowPlayingUrl);
  const data = await fetchResponse.json();
  res.send(data);
});

router.get(`/moviedetails/:id`, async (req, res) => {
  const { id } = req.params;
  const movieDetailsUrl = `${API_BASE_MOVIES_URL}/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchMovieDetailsResponse = await fetch(movieDetailsUrl);
  const movieDetails = await fetchMovieDetailsResponse.json();

  const movieWatchProviderUrl = `${API_BASE_MOVIES_URL}/${id}/watch/providers?api_key=${API_KEY}`;
  const fetchWatchProvidersResponse = await fetch(movieWatchProviderUrl);
  const movieWatchProviders = await fetchWatchProvidersResponse.json();

  const movieCreditsUrl = `${API_BASE_MOVIES_URL}/${id}/credits?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchMovieCreditsResponse = await fetch(movieCreditsUrl);
  const movieCredits = await fetchMovieCreditsResponse.json();

  const similarMoviesUrl = `${API_BASE_MOVIES_URL}/${id}/similar?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1`;
  const fetchSimilarMoviesResponse = await fetch(similarMoviesUrl);
  const similarMovies = await fetchSimilarMoviesResponse.json();

  const movieTrailerUrl = `${API_BASE_MOVIES_URL}/${id}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}&include_image_language=de`;
  const fetchMovieTrailerUrlResponse = await fetch(movieTrailerUrl);
  const movieTrailer = await fetchMovieTrailerUrlResponse.json();

  res.send({
    movieDetails,
    movieWatchProviders,
    movieCredits,
    similarMovies,
    movieTrailer,
  });
});

export default router;

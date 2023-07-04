import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const { API_BASE_SERIES_URL, API_KEY, API_LANGUAGE } = process.env;

router.get('/popular', async (req, res) => {
  const url = `${API_BASE_SERIES_URL}/popular?api_key=${API_KEY}&language=${API_LANGUAGE}`;

  const fetchResponse = await fetch(url);
  const data = await fetchResponse.json();
  res.send(data);
});

router.get('/toprated', async (req, res) => {
  const url = `${API_BASE_SERIES_URL}/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}`;

  const fetchResponse = await fetch(url);
  const data = await fetchResponse.json();
  res.send(data);
});

router.get('/onair', async (req, res) => {
  const onAirUrl = `${API_BASE_SERIES_URL}/on_the_air?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchResponse = await fetch(onAirUrl);
  const data = await fetchResponse.json();
  res.send(data);
});

router.get('/:id/season/:season', async (req, res) => {
  const { id, season } = req.params;
  const seasonDetailsUrl = `${API_BASE_SERIES_URL}/${id}/season/${season}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchResponse = await fetch(seasonDetailsUrl);
  const data = await fetchResponse.json();
  res.send({ data });
});

router.get(`/seriesdetails/:id`, async (req, res) => {
  const { id } = req.params;
  const seriesDetailsUrl = `${API_BASE_SERIES_URL}/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchSeriesDetailsResponse = await fetch(seriesDetailsUrl);
  const seriesDetails = await fetchSeriesDetailsResponse.json();

  const seriesWatchProviderUrl = `${API_BASE_SERIES_URL}/${id}/watch/providers?api_key=${API_KEY}`;
  const fetchSeriesWatchProvidersResponse = await fetch(seriesWatchProviderUrl);
  const seriesWatchProviders = await fetchSeriesWatchProvidersResponse.json();

  const seriesCreditsUrl = `${API_BASE_SERIES_URL}/${id}/credits?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchSeriesCreditsResponse = await fetch(seriesCreditsUrl);
  const seriesCredits = await fetchSeriesCreditsResponse.json();

  const similarSeriesUrl = `${API_BASE_SERIES_URL}/${id}/similar?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1`;
  const fetchSimilarSeriesResponse = await fetch(similarSeriesUrl);
  const similarSeries = await fetchSimilarSeriesResponse.json();

  const seriesTrailerUrl = `${API_BASE_SERIES_URL}/${id}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}&include_image_language=de`;
  const fetchSeriesTrailerUrlResponse = await fetch(seriesTrailerUrl);
  const seriesTrailer = await fetchSeriesTrailerUrlResponse.json();

  res.send({
    seriesDetails,
    seriesWatchProviders,
    seriesCredits,
    similarSeries,
    seriesTrailer,
  });
});

export default router;

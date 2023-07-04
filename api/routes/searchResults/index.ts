import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const { API_BASE_URL_SEARCH, API_KEY, API_LANGUAGE } = process.env;

router.get('/:query/:page', async (req, res) => {
  const { query, page } = req.params;
  const searchResultsUrl = `${API_BASE_URL_SEARCH}?api_key=${API_KEY}&language=${API_LANGUAGE}&query=${query}&page=${page}&include_adult=false&region=DE`;
  const fetchResponse = await fetch(searchResultsUrl);
  const data = await fetchResponse.json();
  res.send(data);
});

export default router;

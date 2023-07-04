import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const { API_BASE_PERSON_URL, API_KEY, API_LANGUAGE } = process.env;

router.get('/:personId', async (req, res) => {
  const { personId } = req.params;
  const personDetailsUrl = `${API_BASE_PERSON_URL}/${personId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
  const fetchResponse = await fetch(personDetailsUrl);
  const data = await fetchResponse.json();
  res.send(data);
});

export default router;

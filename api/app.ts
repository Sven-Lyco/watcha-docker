import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import series from './routes/series/index.js';
import movies from './routes/movies/index.js';
import person from './routes/person/index.js';
import searchResults from './routes/searchResults/index.js';
import watchedEpisodes from './routes/watchedEpisodes/index.js';
import watchedSeries from './routes/watchedSeries/index.js';
import watchedMovies from './routes/watchedMovies/index.js';
import watchlist from './routes/watchlist/index.js';

const app = express();
dotenv.config();

const { PORT, MONGODB_URI } = process.env;
const uri: string = MONGODB_URI!;

app.use(express.json());

app.use('/api/series', series);
app.use('/api/movies', movies);
app.use('/api/person', person);
app.use('/api/searchResults', searchResults);
app.use('/api/watchedEpisodes', watchedEpisodes);
app.use('/api/watchedSeries', watchedSeries);
app.use('/api/watchedMovies', watchedMovies);
app.use('/api/watchlist', watchlist);

app.use(express.static('client/build'));

app.use((req, res) => res.sendStatus(404));

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error;
  });

import express from 'express';

import dotenv from 'dotenv';
import WatchedMovie from '../../models/WatchedMovie.js';
import { IWatchedMovie } from '../../shared/mongoose-types.js';

const router = express.Router();
dotenv.config();

router.get('/', async (req, res) => {
  try {
    const watchedMovies: IWatchedMovie[] = await WatchedMovie.find();
    res.status(200).json({ watchedMovies });
  } catch (error) {
    throw error;
  }
});

router.post('/:movieId/:title', async (req, res) => {
  const { movieId, title } = req.params;
  try {
    const newWatchedMovie: IWatchedMovie = await WatchedMovie.create({
      movieId,
      title,
    });
    return res.status(200).json(newWatchedMovie);
  } catch (error) {
    throw error;
  }
});

router.get('/:deleteId', async (req, res) => {
  const { deleteId } = req.params;
  try {
    const result: IWatchedMovie | null = await WatchedMovie.findByIdAndDelete(
      deleteId
    );
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

export default router;

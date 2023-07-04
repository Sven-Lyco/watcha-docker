import express from 'express';
import dotenv from 'dotenv';
import WatchedEpisode from '../../models/WatchedEpisode.js';
import { IWatchedEpisode } from '../../shared/mongoose-types.js';

const router = express.Router();
dotenv.config();

router.get('/', async (req, res) => {
  try {
    const watchedEpisodes: IWatchedEpisode[] = await WatchedEpisode.find();
    res.status(200).json({ watchedEpisodes });
  } catch (error) {
    throw error;
  }
});

router.post('/:episodeId', async (req, res) => {
  const { episodeId } = req.params;
  try {
    const newWatchedSeries: IWatchedEpisode = await WatchedEpisode.create({
      episodeId,
    });
    return res.status(200).json(newWatchedSeries);
  } catch (error) {
    throw error;
  }
});

router.get('/:deleteId', async (req, res) => {
  const { deleteId } = req.params;
  try {
    const result: IWatchedEpisode | null =
      await WatchedEpisode.findByIdAndDelete(deleteId);
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

export default router;

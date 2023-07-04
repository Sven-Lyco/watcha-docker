import express from 'express';
import dotenv from 'dotenv';
import WatchedSeries from '../../models/WatchedSeries.js';
import { IWatchedSeries } from '../../shared/mongoose-types.js';

const router = express.Router();
dotenv.config();

router.get('/', async (req, res) => {
  try {
    const watchedSeries: IWatchedSeries[] = await WatchedSeries.find();
    res.status(200).json({ watchedSeries });
  } catch (error) {
    throw error;
  }
});

router.post('/:seriesId/:name', async (req, res) => {
  const { seriesId, name } = req.params;
  try {
    const newWatchedSeries: IWatchedSeries = await WatchedSeries.create({
      seriesId,
      name,
    });
    return res.status(200).json(newWatchedSeries);
  } catch (error) {
    throw error;
  }
});

router.get('/:deleteId', async (req, res) => {
  const { deleteId } = req.params;
  try {
    const result: IWatchedSeries | null = await WatchedSeries.findByIdAndDelete(
      deleteId
    );
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

export default router;

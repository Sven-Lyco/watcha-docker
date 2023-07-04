import express from 'express';
import dotenv from 'dotenv';
import Watchlist from '../../models/Watchlist.js';
import { IWatchlist } from '../../shared/mongoose-types.js';

const router = express.Router();
dotenv.config();

router.get('/', async (req, res) => {
  try {
    const watchlist: IWatchlist[] = await Watchlist.find();
    res.status(200).json({ watchlist });
  } catch (error) {
    throw error;
  }
});

// Add Movie to Watchlist
router.post('/movie/:id/:title/:category', async (req, res) => {
  try {
    const newWatchedMovie: IWatchlist = await Watchlist.create(req.body);
    return res.status(200).json(newWatchedMovie);
  } catch (error) {
    throw error;
  }
});

// Add Series to Watchlist
router.post('/series/:id/:name/:category', async (req, res) => {
  try {
    const newWatchedSeries: IWatchlist = await Watchlist.create(req.body);
    return res.status(200).json(newWatchedSeries);
  } catch (error) {
    throw error;
  }
});

router.get('/:deleteId', async (req, res) => {
  const { deleteId } = req.params;
  try {
    const result: IWatchlist | null = await Watchlist.findByIdAndDelete(
      deleteId
    );
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
});

export default router;

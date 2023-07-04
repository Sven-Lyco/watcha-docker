import mongoose from 'mongoose';
import { IWatchlist } from '../shared/mongoose-types.js';

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    title: { type: String },
    posterPath: { type: String },
    category: { type: String },
  },
  {
    versionKey: false,
    collection: 'watchlist',
  }
);

export default model<IWatchlist>('WatchlistEntry', schema);

import mongoose from 'mongoose';
import { IWatchedSeries } from '../shared/mongoose-types.js';

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    seriesId: { type: String },
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model<IWatchedSeries>('WatchedSeries', schema);

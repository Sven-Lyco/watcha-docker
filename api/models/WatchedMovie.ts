import mongoose from 'mongoose';
import { IWatchedMovie } from '../shared/mongoose-types.js';

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    movieId: { type: String },
    title: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model<IWatchedMovie>('WatchedMovie', schema);

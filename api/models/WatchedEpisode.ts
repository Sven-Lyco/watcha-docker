import mongoose from 'mongoose';
import { IWatchedEpisode } from '../shared/mongoose-types.js';

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    episodeId: { type: Number },
  },
  {
    versionKey: false,
  }
);

export default model<IWatchedEpisode>('WatchedEpisode', schema);

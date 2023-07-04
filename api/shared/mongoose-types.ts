import { Document } from 'mongoose';

export interface IWatchedEpisode extends Document {
  episodeId: number;
}

export interface IWatchedMovie extends Document {
  movieId: number;
  title: string;
}

export interface IWatchedSeries extends Document {
  seriesId: number;
  name: string;
}

export interface IWatchlist extends Document {
  id: string;
  name?: string;
  title?: string;
  posterPath: string;
  category: string;
}

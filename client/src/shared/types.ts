export interface IButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonType: string;
  children: React.ReactNode;
}

export interface ISVGButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}

export interface IWatchedEpisodes {
  _id?: string;
  episodeId: number;
}

export interface IWatchedMovies {
  _id?: string;
  movieId: number;
  title: string;
}

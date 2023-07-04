import useSWR from 'swr';
import {
  getWatchedEpisodes,
  addWatchedEpisode,
  deleteWatchedEpisode,
} from '../services/watchedEpisodes';
import { IWatchedEpisodes } from '../shared/types';

export default function useEpisodes() {
  const {
    data,
    error: watchedEpisodesError,
    mutate: mutateWatchedEpisodes,
  } = useSWR('/api/watchedEpisodes', getWatchedEpisodes);

  const watchedEpisodes = data?.watchedEpisodes as IWatchedEpisodes[];

  async function handleCheckEpisode(episodeId: string) {
    const watchedEpisode = { episodeId };
    const isOnList: boolean = watchedEpisodes.some(
      (episode: any) => episode.episodeId === watchedEpisode.episodeId
    );

    if (isOnList) {
      const filteredItems = watchedEpisodes.filter(
        (result: any) => result.episodeId !== episodeId
      );
      mutateWatchedEpisodes(filteredItems, false);
      const filteredItem = watchedEpisodes.find(
        (result: any) => result.episodeId === episodeId
      );
      const deleteId = filteredItem?._id;
      deleteWatchedEpisode(deleteId);

      mutateWatchedEpisodes();
    }

    if (!isOnList) {
      mutateWatchedEpisodes([...watchedEpisodes, watchedEpisode], false);

      addWatchedEpisode(watchedEpisode);

      mutateWatchedEpisodes();
    }
  }

  function checkIsEpisodeWatched(episodeId: string) {
    const watchedEpisode = { episodeId };
    return watchedEpisodes?.some(
      (episode: any) => episode.episodeId === watchedEpisode.episodeId
    );
  }

  return { watchedEpisodesError, handleCheckEpisode, checkIsEpisodeWatched };
}

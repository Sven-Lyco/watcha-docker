import useSWR from 'swr';

import {
  getWatchlist,
  deleteFromWatchlist,
  addMovieToWatchlist,
  addSeriesToWatchlist,
} from '../services/watchlist';

export default function useWatchlist() {
  const {
    data,
    error: watchlistError,
    mutate: mutateWatchlist,
  } = useSWR('/api/watchlist', getWatchlist);

  const watchlist = data?.watchlist;

  async function handleAddMovie(
    id: string,
    title: string,
    posterPath: string,
    category: string
  ) {
    const watchlistItem = { id, title, posterPath, category };
    if (watchlist.find((item: any) => item.id === watchlistItem.id)) {
      return;
    } else {
      mutateWatchlist([...watchlist, watchlistItem], false);

      addMovieToWatchlist(watchlistItem);

      mutateWatchlist();
    }
  }

  async function handleAddSeries(
    id: string,
    name: string,
    posterPath: string,
    category: string
  ) {
    const watchlistItem = { id, name, posterPath, category };
    if (watchlist.find((item: any) => item.id === watchlistItem.id)) {
      return;
    } else {
      mutateWatchlist([...watchlist, watchlistItem], false);

      addSeriesToWatchlist(watchlistItem);

      mutateWatchlist();
    }
  }

  async function handleDeleteItem(id: string) {
    const filteredItems = watchlist.filter((result: any) => result.id !== id);

    mutateWatchlist(filteredItems, false);

    const filteredItem = watchlist.filter((result: any) => result.id === id);
    const deleteId = filteredItem[0]._id;

    deleteFromWatchlist(deleteId);

    mutateWatchlist();
  }

  function checkIsOnWatchlist(id: string) {
    if (watchlist?.find((item: any) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  }

  return {
    watchlist,
    watchlistError,
    checkIsOnWatchlist,
    handleDeleteItem,
    handleAddSeries,
    handleAddMovie,
  };
}

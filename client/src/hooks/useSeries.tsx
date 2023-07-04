import {
  getPopularSeries,
  getTopRatedSeries,
  getSeriesOnAir,
} from '../services/getSeries';
import {
  getWatchedSeries,
  deleteWatchedSeries,
  addWatchedSeries,
} from '../services/watchedSeries';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function useSeries() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [seriesOnTv, setSeriesOnTv] = useState([]);
  const {
    data,
    error: watchedSeriesError,
    mutate: mutateWatchedSeries,
  } = useSWR('/api/watchedSeries', getWatchedSeries);

  const watchedSeries = data?.watchedSeries;

  useEffect(() => {
    async function loadSeries() {
      getPopularSeries().then(data => setPopularSeries(data.results));
      getTopRatedSeries().then(data => setTopRatedSeries(data.results));
      getSeriesOnAir().then(data => setSeriesOnTv(data.results));
    }
    loadSeries();
  }, []);

  async function handleCheckSeries(seriesId: string | undefined, name: string) {
    const watchedSerie = { seriesId, name };
    const isOnList = watchedSeries.some(
      (series: any) => series.seriesId === watchedSerie.seriesId
    );

    if (isOnList) {
      const filteredItems = watchedSeries.filter(
        (result: any) => result.seriesId !== seriesId
      );
      mutateWatchedSeries(filteredItems, false);
      const filteredItem = watchedSeries.find(
        (result: any) => result.seriesId === seriesId
      );
      const deleteId = filteredItem._id;
      deleteWatchedSeries(deleteId);

      mutateWatchedSeries();
    }

    if (!isOnList) {
      mutateWatchedSeries([...watchedSeries, watchedSeries], false);
      addWatchedSeries(watchedSerie);
      mutateWatchedSeries();
    }
  }

  function checkIsSeriesWatched(seriesId: string | undefined) {
    const watchedSerie = { seriesId };
    return watchedSeries?.some(
      (series: any) => series.seriesId === watchedSerie.seriesId
    );
  }

  return {
    popularSeries,
    topRatedSeries,
    seriesOnTv,
    watchedSeries,
    watchedSeriesError,
    handleCheckSeries,
    checkIsSeriesWatched,
  };
}

import { useState, useEffect } from 'react';
import getSeriesDetails from '../services/getSeriesDetails';

export default function useSeriesDetails(id: string | undefined) {
  const [seriesDetails, setSeriesDetails] = useState([]);
  const [seriesCast, setSeriesCast] = useState([]);
  const [seriesWatchProviders, setSeriesWatchProviders] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [seriesTrailer, setSeriesTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const seriesTrailerUrl = seriesTrailer
    .filter(
      (video: any) =>
        video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser') &&
        video.size >= 720
    )
    ?.map(
      (video: any) => `https://www.youtube.com/watch?v=${video.key}wowK7ADGRsQ`
    );

  useEffect(() => {
    setIsLoading(true);
    async function loadSeriesDetails() {
      try {
        await getSeriesDetails(id).then(data => {
          setSeriesDetails(data.seriesDetails);
          setSeriesCast(data.seriesCredits.cast);
          setSeriesWatchProviders(data.seriesWatchProviders.results.DE);
          setSimilarSeries(data.similarSeries.results);
          setSeriesTrailer(data.seriesTrailer.results);
        });
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    loadSeriesDetails();
  }, [id]);

  return {
    seriesTrailerUrl,
    similarSeries,
    seriesWatchProviders,
    seriesCast,
    seriesDetails,
    isLoading,
  };
}

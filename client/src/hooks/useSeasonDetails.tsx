import { useState, useEffect } from 'react';
import getSeason from '../services/getSeason';

export default function useSeasonDetails(
  seriesId: string | undefined,
  currentSeasonNumber: number
) {
  const [seasonDetails, setSeasonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function loadSeason() {
      try {
        await getSeason(seriesId, currentSeasonNumber).then(data =>
          setSeasonDetails(data.data)
        );
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    loadSeason();
  }, [seriesId, currentSeasonNumber]);

  return { seasonDetails, isLoading };
}

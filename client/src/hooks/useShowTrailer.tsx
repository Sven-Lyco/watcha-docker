import { useEffect, useState } from 'react';

interface IUseShowTrailerProps {
  trailerUrl: string[];
  isShowTrailer: boolean;
}

export default function useShowTrailer({
  trailerUrl,
  isShowTrailer,
}: IUseShowTrailerProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (trailerUrl.length !== 0) {
      setShowTrailer(true);
    }
    if (trailerUrl.length === 0) {
      setShowTrailer(false);
    }
    if (isShowTrailer === true && trailerUrl.length === 0) {
      setShowTrailer(false);
    }
    if (isShowTrailer === false) {
      setShowTrailer(false);
    }
  }, [isShowTrailer, trailerUrl]);

  return { showTrailer };
}

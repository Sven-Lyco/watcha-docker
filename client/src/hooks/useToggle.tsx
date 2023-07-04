import { useEffect, useState } from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';

export default function useToggle() {
  const [showTrailer, setShowTrailer] = useState(
    loadFromLocal('showTrailer') ?? false
  );

  const [seenTitle, setSeenTitle] = useState(
    loadFromLocal('seenTitle') ?? false
  );

  useEffect(() => {
    saveToLocal('showTrailer', showTrailer);
    saveToLocal('seenTitle', seenTitle);
  }, [showTrailer, seenTitle]);

  function handleSetShowTrailer(event: any) {
    setShowTrailer(event.target.checked);
  }

  function handleSetSeenTitle(event: any) {
    setSeenTitle(event.target.checked);
  }

  return { showTrailer, seenTitle, handleSetShowTrailer, handleSetSeenTitle };
}

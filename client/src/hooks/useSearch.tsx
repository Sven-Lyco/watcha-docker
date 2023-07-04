import { useEffect, useState } from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { getSearchResults } from '../services/getSearchResults';

export default function useSearch() {
  const [query, setQuery] = useState(loadFromLocal('query') ?? '');
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    saveToLocal('query', query);
    query &&
      getSearchResults(query, page).then((data: any) => setCurrentData(data));
  }, [query, page]);

  function loadMoreResults(customPageNumber: number) {
    setPage(customPageNumber + 1);
  }

  function loadLessResults(customPageNumber: number) {
    setPage(customPageNumber - 1);
  }

  function handleSearch(event: React.FormEvent<HTMLInputElement>) {
    const currentQuery = event.currentTarget.value;
    const editedQuery = currentQuery.trim();

    if (editedQuery === '') {
      setCurrentData([]);
    }
    setPage(1);
    setQuery(currentQuery);
  }

  function handleClearSearch() {
    setQuery('');
    setCurrentData([]);
    setPage(1);
  }

  return {
    currentData,
    query,
    handleSearch,
    handleClearSearch,
    loadMoreResults,
    loadLessResults,
    page,
  };
}

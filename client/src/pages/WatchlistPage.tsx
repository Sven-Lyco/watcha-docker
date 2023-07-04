import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import useMovie from '../hooks/useMovie';
import useSeries from '../hooks/useSeries';
import useWatchlist from '../hooks/useWatchlist';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import Navigation from '../components/Navigation';
import Poster from '../components/Poster';
import FetchError from '../components/FetchError/FetchError';

export default function WatchlistPage({
  watchlist,
  seenTitle,
}: any): JSX.Element {
  const { checkIsMovieWatched, watchedMovies } = useMovie();
  const { checkIsSeriesWatched, watchedSeries } = useSeries();
  const { watchlistError } = useWatchlist();
  const [selectedCategory, setSelectedCategory] = useState(
    loadFromLocal('selectedCategory') ?? ''
  );
  const filteredWatchlist = useMemo(getFilteredList, [
    selectedCategory,
    watchlist,
  ]);
  const watchlistWithSeenTitles = useMemo(getWatchedTitle, [
    seenTitle,
    filteredWatchlist,
    watchedMovies,
    watchedSeries,
  ]);

  useEffect(() => {
    saveToLocal('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  if (watchlistError)
    return (
      <FetchError
        message={watchlistError?.message}
        onClick={() => window.location.reload()}
      />
    );

  return (
    <Wrapper>
      {watchlist?.length === 0 ? (
        <InfoBox>
          <p>👻</p>
          <p>Deine Watchlist ist aktuell leer.</p>
        </InfoBox>
      ) : (
        <>
          <SelectWrapper>
            <Select
              onChange={handleSelectChange}
              name="category"
              id="category"
              value={selectedCategory}
            >
              <option value="">Alles anzeigen</option>
              <option value="serie">Serien</option>
              <option value="film">Filme</option>
            </Select>
          </SelectWrapper>
          <List role="list">
            {watchlistWithSeenTitles?.map(
              ({ name, title, posterPath, id, category }: any) => (
                <li key={id}>
                  <Link
                    to={category === 'serie' ? `/serie/${id}` : `/film/${id}`}
                  >
                    <Poster
                      src={
                        posterPath
                          ? `https://image.tmdb.org/t/p/w300${posterPath}`
                          : require('../assets/images/poster.png')
                      }
                      alt={name ? `${name}` : `${title}`}
                      isWatched={checkIsWatched(id)}
                    />
                  </Link>
                </li>
              )
            )}
          </List>
        </>
      )}
      <Navigation />
    </Wrapper>
  );

  function checkIsWatched(id: string) {
    if (checkIsMovieWatched(id)) {
      return true;
    }
    if (checkIsSeriesWatched(id)) {
      return true;
    }
  }

  function handleSelectChange(event: any) {
    setSelectedCategory(event.target.value);
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return watchlist;
    }
    return watchlist?.filter((item: any) => item.category === selectedCategory);
  }

  function getWatchedTitle() {
    const watchedSeriesIds = watchedSeries?.map((serie: any) => serie.seriesId);
    const watchedMovieIds = watchedMovies?.map((movie: any) => movie.movieId);

    if (seenTitle) {
      return filteredWatchlist;
    }
    return filteredWatchlist?.filter(
      (item: any) =>
        !watchedSeriesIds?.includes(item.id) &&
        !watchedMovieIds?.includes(item.id)
    );
  }
}

const Wrapper = styled.div`
  margin: 10px auto 90px;
  overflow: scroll hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

const SelectWrapper = styled.div`
  width: 70%;
  margin: 10px auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px 0;
  text-align: center;
  text-align: -webkit-center;
  appearance: none;
  background-color: var(--color-black);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: var(--color-white);

  :focus {
    border: none;
    outline: none;
    box-shadow: 0 0 0 1px #fff;
  }

  option {
    color: var(--color-white);
    text-align: center;
    text-align: -webkit-center;
  }
`;

const InfoBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 20px;

  p {
    text-align: center;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-evenly;
  width: 100%;
  list-style: none;
  padding: 0 10px;
  margin: 0;
`;

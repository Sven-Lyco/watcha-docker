import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import PAGES from '../shared/pages';
import AddButton from '../components/AddButton';
import BackdropImage from '../components/BackdropImage';
import ButtonBack from '../components/ButtonBack';
import ButtonCheck from '../components/ButtonCheck';
import CastList from '../components/CastList';
import DeleteButton from '../components/DeleteButton';
import InnerNavigation from '../components/InnerNavigation';
import LoadingSpinner from '../components/LoadingSpinner';
import Navigation from '../components/Navigation';
import Poster from '../components/Poster';
import PosterList from '../components/PosterList';
import ProviderList from '../components/ProviderList';
import RatingCircle from '../components/RatingCircle';
import ReloadButton from '../components/ReloadButton';
import SeasonsList from '../components/SeasonsList';
import VideoFrame from '../components/VideoFrame';
import FetchError from '../components/FetchError/FetchError';
import useSeriesDetails from '../hooks/useSeriesDetails';
import useShowTrailer from '../hooks/useShowTrailer';
import useSeries from '../hooks/useSeries';
import ScrollToTop from '../utils/ScrollToTop';

export default function SeriesDetailsPage({
  isShowTrailer,
  onHandleAddSeries,
  checkIsOnWatchlist,
  onHandleDeleteItem,
  handleCheckEpisode,
  isEpisodeWatched,
}: any): JSX.Element {
  ScrollToTop();
  const category = 'serie';
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(PAGES.DETAILS);
  const [firstAirDate, setFirsAirDate] = useState('');
  const {
    seriesTrailerUrl,
    similarSeries,
    seriesWatchProviders,
    seriesCast,
    seriesDetails,
    isLoading,
  }: any = useSeriesDetails(id);
  const isOnWatchlist = checkIsOnWatchlist(id);
  const {
    name,
    poster_path: posterPath,
    number_of_seasons: numberOfSeasons,
    first_air_date,
    overview,
    backdrop_path: backdropPath,
    seasons,
    episode_run_time,
    vote_average: rating,
  }: any = seriesDetails;
  const { showTrailer } = useShowTrailer({
    isShowTrailer,
    trailerUrl: seriesTrailerUrl,
  });
  const { watchedSeriesError, handleCheckSeries, checkIsSeriesWatched } =
    useSeries();

  useEffect(() => {
    function sortFirstAirDate() {
      if (first_air_date) {
        const day = first_air_date?.substr(8, 9);
        const month = first_air_date?.substr(5, 2);
        const year = first_air_date?.substr(0, 4);
        setFirsAirDate(`${day}.${month}.${year}`);
      } else {
        setFirsAirDate('');
      }
    }

    sortFirstAirDate();
  }, [first_air_date]);

  if (watchedSeriesError)
    return (
      <FetchError
        message={watchedSeriesError?.message}
        onClick={() => window.location.reload()}
      />
    );

  return (
    <Wrapper>
      <ButtonBack onClick={() => navigate(-1)} />
      {!isLoading && (
        <>
          {showTrailer && <VideoFrame videoUrl={seriesTrailerUrl} />}
          {!showTrailer && <BackdropImage backdropPath={backdropPath} />}
          <Header>
            <Poster
              src={
                posterPath
                  ? `https://image.tmdb.org/t/p/w300${posterPath}`
                  : require('../assets/images/poster.png')
              }
              alt={`${name}`}
            />
            <HeaderBox>
              <Title>{name}</Title>
              <p>
                {numberOfSeasons}
                {numberOfSeasons === 1 ? ' Staffel - ' : ' Staffeln - '}
                {firstAirDate ? firstAirDate : 'kein Release Datum vorhanden'}
              </p>
              <RatingCircle rating={Number(rating?.toFixed(1))} />
            </HeaderBox>
            <ButtonWrapper>
              <ButtonCheck
                onClick={() => handleCheckSeries(id, name)}
                isActive={checkIsSeriesWatched(id)}
              />
              {!isOnWatchlist && (
                <AddButton
                  onClick={() => {
                    onHandleAddSeries(id, name, posterPath, category);
                    if (!isOnWatchlist) {
                      toast.success(`${name} zur Watchlist hinzugefügt`);
                    }
                  }}
                />
              )}
              {isOnWatchlist && (
                <DeleteButton
                  onClick={() => {
                    onHandleDeleteItem(id);
                    if (isOnWatchlist) {
                      toast.error(`${name} von Watchlist entfernt`);
                    }
                  }}
                />
              )}
              {showTrailer && (
                <ReloadButton onClick={() => window.location.reload()} />
              )}
            </ButtonWrapper>
          </Header>
          <InnerNavigation
            currentPage={currentPage}
            handleNavigation={handleNavigation}
          />
          {currentPage === PAGES.DETAILS && (
            <>
              {seriesWatchProviders && (
                <ProviderList providerList={seriesWatchProviders} />
              )}
              <Main>
                <h3>Handlung</h3>
                <p>
                  {overview
                    ? overview
                    : 'Aktuell ist leider keine Beschreibung verfügbar'}
                </p>
                <CastList castList={seriesCast} listName="Hauptdarsteller" />
                <PosterListWrapper>
                  {similarSeries.length > 1 && (
                    <PosterList
                      list={similarSeries}
                      listName="ähnliche Serien"
                    />
                  )}
                </PosterListWrapper>
              </Main>
            </>
          )}
          {currentPage === PAGES.SEASONS && (
            <SeasonsListWrapper>
              <SeasonsList
                seriesId={id}
                seasons={seasons}
                handleCheckEpisode={handleCheckEpisode}
                isEpisodeWatched={isEpisodeWatched}
                episodeRunTime={episode_run_time[0]}
              />
            </SeasonsListWrapper>
          )}
        </>
      )}
      {isLoading && <LoadingSpinner />}
      <Navigation />
    </Wrapper>
  );

  function handleNavigation(page: string) {
    setCurrentPage(page);
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: scroll hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

const PosterListWrapper = styled.div`
  margin: 0 -20px 80px -20px;
`;

const SeasonsListWrapper = styled.div`
  margin-bottom: 90px;
`;

const Header = styled.header`
  display: flex;
  max-height: 170px;
  margin: 0 0 20px 20px;
  position: relative;
`;

const Title = styled.span`
  font-size: x-large;
  font-weight: bold;
  margin: 0;
  padding: 20px 0 5px;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 10px;
  padding: 0;
  margin: 0 10px;
  width: 100%;

  p {
    font-size: large;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
`;

const Main = styled.main`
  margin: 10px 20px;
  padding: 0;

  h3 {
    font-size: x-large;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

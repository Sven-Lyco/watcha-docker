import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AddButton from '../components/AddButton';
import BackdropImage from '../components/BackdropImage';
import ButtonBack from '../components/ButtonBack';
import ButtonCheck from '../components/ButtonCheck';
import CastList from '../components/CastList';
import DeleteButton from '../components/DeleteButton';
import FetchError from '../components/FetchError';
import LoadingSpinner from '../components/LoadingSpinner';
import Navigation from '../components/Navigation';
import Poster from '../components/Poster';
import PosterList from '../components/PosterList';
import ProviderList from '../components/ProviderList';
import RatingCircle from '../components/RatingCircle';
import ReloadButton from '../components/ReloadButton';
import VideoFrame from '../components/VideoFrame';
import useMovie from '../hooks/useMovie';
import useMovieDetails from '../hooks/useMovieDetails';
import useShowTrailer from '../hooks/useShowTrailer';
import ScrollToTop from '../utils/ScrollToTop';

export default function MovieDetailsPage({
  isShowTrailer,
  onHandleAddMovie,
  checkIsOnWatchlist,
  onHandleDeleteItem,
}: any): JSX.Element {
  ScrollToTop();
  const category = 'film';
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    movieTrailerUrl,
    similarMovies,
    movieWatchProviders,
    movieCast,
    movieDetails,
    isLoading,
  }: any = useMovieDetails(id);
  const { watchedMoviesError, handleCheckMovie, checkIsMovieWatched } =
    useMovie();
  const isOnWatchlist = checkIsOnWatchlist(id);
  const {
    title,
    poster_path: posterPath,
    runtime,
    release_date: releaseDate,
    overview,
    backdrop_path: backdropPath,
    vote_average: rating,
  }: any = movieDetails;
  const { showTrailer } = useShowTrailer({
    isShowTrailer,
    trailerUrl: movieTrailerUrl,
  });

  if (watchedMoviesError)
    return (
      <FetchError
        message={watchedMoviesError?.message}
        onClick={() => window.location.reload()}
      />
    );

  return (
    <Wrapper>
      <ButtonBack onClick={() => navigate(-1)} />
      {!isLoading && (
        <>
          {showTrailer && <VideoFrame videoUrl={movieTrailerUrl} />}
          {!showTrailer && <BackdropImage backdropPath={backdropPath} />}
          <Header>
            <Poster
              src={
                posterPath
                  ? `https://image.tmdb.org/t/p/w300${posterPath}`
                  : require('../assets/images/poster.png')
              }
              alt={`${title}`}
            />
            <StyledHeaderBox>
              <Title>{title}</Title>
              <p>
                {releaseDate
                  ? releaseDate.substr(0, 4)
                  : 'kein Release Datum vorhanden'}{' '}
                - {calcMovieTime(runtime)}
              </p>
              <RatingCircle rating={Number(rating?.toFixed(1))} />
            </StyledHeaderBox>
            <ButtonWrapper>
              <ButtonCheck
                onClick={() => handleCheckMovie(id, title)}
                isActive={checkIsMovieWatched(id)}
              />
              {!isOnWatchlist && (
                <AddButton
                  onClick={() => {
                    onHandleAddMovie(id, title, posterPath, category);
                    if (!isOnWatchlist) {
                      toast.success(`${title} zur Watchlist hinzugefügt`);
                    }
                  }}
                />
              )}
              {isOnWatchlist && (
                <DeleteButton
                  onClick={() => {
                    onHandleDeleteItem(id);
                    if (isOnWatchlist) {
                      toast.error(`${title} von Watchlist entfernt`);
                    }
                  }}
                />
              )}
              {showTrailer && (
                <ReloadButton onClick={() => window.location.reload()} />
              )}
            </ButtonWrapper>
          </Header>
          {movieWatchProviders && (
            <ProviderList providerList={movieWatchProviders} />
          )}
          <Main>
            <h3>Handlung</h3>
            <p>
              {overview
                ? overview
                : 'Aktuell ist leider keine Beschreibung verfügbar'}
            </p>
            <CastList castList={movieCast} listName="Hauptdarsteller" />
            <PosterListWrapper>
              {similarMovies.length > 1 && (
                <PosterList list={similarMovies} listName="ähnliche Filme" />
              )}
            </PosterListWrapper>
          </Main>
        </>
      )}
      {isLoading && <LoadingSpinner />}
      <Navigation />
    </Wrapper>
  );

  function calcMovieTime(movieRunTime: any) {
    const hours = Math.floor(movieRunTime / 60);
    const minutes = Math.ceil((movieRunTime / 60 - hours) * 60);
    return `${hours} Std. ${minutes} min.`;
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: scroll hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

const PosterListWrapper = styled.div`
  margin: 0 -20px 80px -20px;
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

const StyledHeaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 10px;
  padding: 0;
  margin: 0 10px;

  p {
    margin: 0;
    padding: 0;
    font-size: large;
    font-style: italic;
    font-weight: 400;
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

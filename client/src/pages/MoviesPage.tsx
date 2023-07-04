import styled from 'styled-components';
import Navigation from '../components/Navigation';
import PosterList from '../components/PosterList';
import ScrollToTop from '../utils/ScrollToTop';

export default function MoviesPage({
  popularMovies,
  moviesOnCinema,
  upcomingMovies,
}: any): JSX.Element {
  ScrollToTop();
  return (
    <Wrapper>
      <main>
        <PosterList list={popularMovies} listName={'Beliebte Filme'} />
        <PosterList list={moviesOnCinema} listName={'Aktuell im Kino'} />
        <PosterList list={upcomingMovies} listName={'Demnächst im Kino'} />
      </main>
      <Navigation />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0px auto 80px;
  overflow: scroll hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

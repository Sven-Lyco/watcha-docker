import styled from 'styled-components';
import Navigation from '../components/Navigation';
import PosterList from '../components/PosterList';
import ScrollToTop from '../utils/ScrollToTop';

export default function SeriesPage({
  popularSeries,
  topRatedSeries,
  seriesOnTv,
}: any): JSX.Element {
  ScrollToTop();
  return (
    <Wrapper>
      <main>
        <PosterList list={popularSeries} listName={'Beliebte Serien'} />
        <PosterList list={topRatedSeries} listName={'Top bewertete Serien'} />
        <PosterList list={seriesOnTv} listName={'Serien im TV'} />
      </main>
      <Navigation />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto 80px;
  overflow: scroll hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

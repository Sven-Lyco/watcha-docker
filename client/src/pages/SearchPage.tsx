import { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import SearchResultCard from '../components/SearchResultCard';
import Searchbar from '../components/Searchbar/Searchbar';
import { ReactComponent as SearchIcon } from '../assets/icons/search_icon.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow_back.svg';
import useSearch from '../hooks/useSearch';
import Button from '../components/Button';
import ScreenReaderOnly from '../components/ScreenReaderOnly';

export default function SearchPage(): JSX.Element {
  const {
    currentData,
    query,
    handleSearch,
    handleClearSearch,
    loadMoreResults,
    loadLessResults,
    page,
  }: any = useSearch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentData.page, page]);

  return (
    <Wrapper>
      <Searchbar
        query={query}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      {currentData.results === undefined && (
        <InfoBox>
          <StyledSearchIcon />
        </InfoBox>
      )}
      {currentData.results?.length !== 0 ? (
        <>
          <List role="list">
            {currentData.results?.map(
              ({
                id,
                name,
                title,
                poster_path,
                profile_path,
                release_date,
                first_air_date,
                media_type,
              }: any) => (
                <ListItem key={id}>
                  <SearchResultCard
                    id={id}
                    name={name}
                    title={title}
                    posterPath={poster_path}
                    profilePath={profile_path}
                    releaseDate={release_date}
                    firstAirDate={first_air_date}
                    mediaType={media_type}
                  />
                </ListItem>
              )
            )}
          </List>
          {currentData.results !== undefined && (
            <CenterButtons>
              {currentData.page > 1 && (
                <Button
                  buttonType="normal"
                  onClick={() => loadLessResults(page)}
                >
                  <ShowLessIcon />
                  <ScreenReaderOnly>weniger Ergebnisse laden</ScreenReaderOnly>
                </Button>
              )}
              {currentData.total_pages !== page && (
                <Button
                  buttonType="normal"
                  onClick={() => loadMoreResults(currentData.page)}
                >
                  <ShowMoreIcon />
                  <ScreenReaderOnly>mehr Ergebnisse laden</ScreenReaderOnly>
                </Button>
              )}
            </CenterButtons>
          )}
        </>
      ) : (
        <InfoBox>
          <StyledSearchIcon />
        </InfoBox>
      )}
      <Navigation />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0px auto 85px;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

const List = styled.ul`
  list-style: none;
  padding: 0 25px;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  font-size: larger;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--border-color);
  margin: 0;
  padding: 10px 0;
`;

const InfoBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 70vh;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 100%;
  height: auto;
  max-width: 20vw;
  color: #454545;
`;

const CenterButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ShowMoreIcon = styled(ArrowIcon)`
  background-color: none;
  border-radius: var(--border-radius);
  transform: rotate(180deg);
`;

const ShowLessIcon = styled(ArrowIcon)`
  background-color: none;
  border-radius: var(--border-radius);
`;

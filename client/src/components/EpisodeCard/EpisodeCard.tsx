import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ButtonCheck from '../ButtonCheck/ButtonCheck';

interface IEpisodeCardProps {
  episode: any;
  handleCheckEpisode: React.MouseEventHandler<HTMLButtonElement>;
  isEpisodeWatched: boolean;
}

export default function EpisodeCard({
  episode,
  handleCheckEpisode,
  isEpisodeWatched,
}: IEpisodeCardProps): JSX.Element {
  const { name, episode_number, still_path, id } = episode;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [firstAirDate, setFirstAirDate] = useState('');
  const day = episode.air_date?.substr(8, 9);
  const currentDay = '0' + new Date().getDate();
  const month = episode.air_date?.substr(5, 2);
  const currentMonth = Number(new Date().getMonth() + 1);
  const year = episode.air_date?.substr(0, 4);
  const currentYear = Number(new Date().getFullYear());
  const airDate = `${year}${month}${day}`;
  const currentDate = `${currentYear}${currentMonth}${currentDay}`;

  useEffect(() => {
    function createFirstAirDate() {
      setFirstAirDate(`${day}.${month}.${year}`);
    }
    createFirstAirDate();
  }, [day, month, year]);

  return (
    <ListItem
      onClick={event => handleIsCollapsed(event)}
      isCollapsed={isCollapsed}
    >
      <ListWrapper>
        <ImageBox stillPath={still_path} />
        <section>
          <p>
            Episode {episode_number}
            {episode.air_date && (hideAirDate() ? '' : ` / ${firstAirDate}`)}
          </p>
          <span>{name}</span>
        </section>
        <ButtonWrapper>
          <ButtonCheck
            onClick={() => handleCheckEpisode(id)}
            isActive={isEpisodeWatched}
          />
        </ButtonWrapper>
      </ListWrapper>
      {episode.overview !== '' && (
        <Overview isCollapsed={isCollapsed}>{episode.overview}</Overview>
      )}
    </ListItem>
  );

  function handleIsCollapsed(event: any) {
    if (event.target.tagName === 'P') {
      setIsCollapsed(!isCollapsed);
    }
  }

  function hideAirDate() {
    if (Number(currentDate) > Number(airDate)) {
      return true;
    }
  }
}

const ListItem = styled.li<{ isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 10px 20px;
  border-radius: var(--border-radius);
  border: 2px solid var(--border-color);
  background-color: var(--color-dark-gray);

  p {
    font-size: 0.95rem;
    padding: 0;
    margin: 0;
  }

  span {
    color: var(--color-light-gray);
    font-size: 0.8rem;
    font-style: italic;
    text-align: justify;
    hyphens: auto;
  }

  section {
    padding: 10px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ImageBox = styled.div<{ stillPath: string | undefined }>`
  width: ${({ stillPath }) => (stillPath ? `100%` : '0')};
  max-width: 90px;
  height: auto;
  background: ${({ stillPath }) =>
      stillPath ? `url(https://image.tmdb.org/t/p/w300${stillPath})` : ''}
    center 0 no-repeat;
  background-size: cover;
  background-position: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 7px 0 auto;
`;

const Overview = styled.span<{ isCollapsed: boolean | undefined }>`
  display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};
  height: 100%;
  padding: 5px;
  text-align: justify;
  hyphens: auto;
  font-size: smaller;
`;

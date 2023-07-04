import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultPoster from '../../assets/images/poster.png';
import useSeasonDetails from '../../hooks/useSeasonDetails';
import ButtonSeason from '../ButtonSeason/ButtonSeason';
import EpisodeCard from '../EpisodeCard/EpisodeCard';
import Poster from '../Poster/Poster';

interface ISeasonsListProps {
  seasons: any;
  seriesId: string | undefined;
  episodeRunTime: string;
  handleCheckEpisode: React.MouseEventHandler<HTMLButtonElement>;
  isEpisodeWatched: (episodeId: string) => boolean;
}

export default function SeasonsList({
  seasons,
  seriesId,
  episodeRunTime,
  handleCheckEpisode,
  isEpisodeWatched,
}: ISeasonsListProps): JSX.Element {
  const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1);
  const [firstAirDate, setFirstAirDate] = useState('');
  const currentSeason = seasons.find(
    ({ season_number: seasonNumber }: any) =>
      seasonNumber === currentSeasonNumber
  );
  const { seasonDetails }: any = useSeasonDetails(
    seriesId,
    currentSeasonNumber
  );
  const { poster_path: posterPath, name } = currentSeason;
  const seasonEpisodes = seasonDetails.episodes;
  const seasonAirDate = seasonDetails.air_date;

  useEffect(() => {
    function sortFirstAirDate() {
      const day = seasonAirDate?.substr(8, 9);
      const month = seasonAirDate?.substr(5, 2);
      const year = seasonAirDate?.substr(0, 4);
      setFirstAirDate(`${day}.${month}.${year}`);
    }

    sortFirstAirDate();
  }, [seasonAirDate]);

  return (
    <section>
      <List role="list">
        {seasons
          .filter((result: any) => result.name !== 'Extras')
          .map(({ id, name, season_number: seasonNumber }: any) => (
            <li key={id}>
              <ButtonSeason
                name={name}
                isActive={seasonNumber === currentSeasonNumber}
                onClick={() => handleSwitchSeason(seasonNumber)}
              />
            </li>
          ))}
      </List>
      <InfoWrapper>
        <Poster
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w300${posterPath}`
              : defaultPoster
          }
          alt={name}
        />
        <TextBox>
          <span>Staffel {currentSeasonNumber}</span>
          {seasonEpisodes && <p>{seasonEpisodes.length} Episoden</p>}
          {seasonAirDate && <p>{firstAirDate}</p>}
          {episodeRunTime && <p>{episodeRunTime} min. pro Episode</p>}
        </TextBox>
      </InfoWrapper>
      <EpisodeList role="list">
        {seasonEpisodes?.map((episode: any) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            handleCheckEpisode={handleCheckEpisode}
            isEpisodeWatched={isEpisodeWatched(episode.id)}
          />
        ))}
      </EpisodeList>
    </section>
  );

  function handleSwitchSeason(seasonNumber: number) {
    setCurrentSeasonNumber(seasonNumber);
  }
}

const List = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 20px;
  margin: 0;
  gap: 10px;
  overflow: scroll hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-padding-left: 20px;

  li {
    scroll-snap-align: start;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const TextBox = styled.div`
  max-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 20px;
  margin: 0;

  span {
    font-size: larger;
  }

  p {
    margin: 0;
    font-size: large;
    font-style: italic;
  }
`;

const EpisodeList = styled.ul`
  list-style: none;
  padding: 0;
`;

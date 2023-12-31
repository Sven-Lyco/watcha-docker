import styled from 'styled-components';
import defaultPoster from '../../assets/images/profile.png';
import PosterActor from '../PosterActor/PosterActor';
import { Link } from 'react-router-dom';

interface ICastListProps {
  castList: Array<{
    id: string;
    name: string;
    character: string;
    profile_path: string;
  }>;
  listName: string;
}

export default function CastList({
  castList,
  listName,
}: ICastListProps): JSX.Element {
  return (
    <>
      {listName && <ListHeader>{listName}</ListHeader>}
      {castList?.length >= 1 ? (
        <List role="list" listLength={castList.length}>
          {castList.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <Link to={`/person/${id}`}>
                <PosterActor
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w300${profile_path}`
                      : defaultPoster
                  }
                  alt={name}
                />
              </Link>
              <ActorName>{name}</ActorName>
              <CharacterName>{character}</CharacterName>
            </li>
          ))}
        </List>
      ) : (
        <>
          <p>Es sind leider keine Hauptdarsteller verfügbar</p>
        </>
      )}
    </>
  );
}

const ListHeader = styled.h3`
  margin-top: 10px;
  font-size: x-large;
`;

const List = styled.ul<{ listLength: number }>`
  list-style: none;
  display: grid;
  grid-template-columns: ${({ listLength }) =>
    listLength ? `repeat(${listLength}, auto)` : `repeat(20, auto)`};
  grid-template-rows: 1fr;
  padding: 0 20px;
  margin: 0 -20px;
  gap: 20px;
  overflow: scroll hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-padding-left: 20px;

  li {
    padding: 0;
    margin: 0;
    max-width: 120px;
    scroll-snap-align: start;
  }
`;

const ActorName = styled.p`
  margin: 0;
  padding: 0;
  font-size: medium;
  color: var(--color-white);
`;

const CharacterName = styled.p`
  margin: 0;
  padding: 0;
  font-size: small;
  font-style: italic;
  color: var(--color-light-gray);
`;

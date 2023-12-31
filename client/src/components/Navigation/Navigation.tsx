import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings_icon.svg';
import { ReactComponent as MovieIcon } from '../../assets/icons/movie_icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_icon.svg';
import { ReactComponent as SeriesIcon } from '../../assets/icons/series_icon.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/watchlist_icon.svg';

export default function Navigation(): JSX.Element {
  return (
    <StyledNavigation>
      <Link to="/serien">
        <SeriesIcon />
        <ScreenReaderOnly>Serien</ScreenReaderOnly>
      </Link>
      <Link to="/filme">
        <MovieIcon />
        <ScreenReaderOnly>Filme</ScreenReaderOnly>
      </Link>
      <Link to="/suche">
        <SearchIcon />
        <ScreenReaderOnly>Suche</ScreenReaderOnly>
      </Link>
      <Link to="/watchlist">
        <ListIcon />
        <ScreenReaderOnly>Watchlist</ScreenReaderOnly>
      </Link>
      <Link to="/">
        <SettingsIcon />
        <ScreenReaderOnly>Settings</ScreenReaderOnly>
      </Link>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 18px;
  border-top: 1px solid var(--border-color);
  background-color: var(--color-black);
  position: fixed;
  bottom: 0;
`;

const Link = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  color: inherit;
  text-decoration: none;

  &.active {
    color: var(--color-orange);
  }
`;

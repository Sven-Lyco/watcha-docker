import React, { useState } from 'react';
import styled from 'styled-components';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete_icon.svg';

interface ISearchbar {
  query: string;
  handleSearch: (
    event: React.FormEvent<HTMLInputElement>
  ) => React.FormEvent<HTMLInputElement>;
  handleClearSearch: () => void;
}

export default function Searchbar({
  query,
  handleSearch,
  handleClearSearch,
}: ISearchbar): JSX.Element {
  const [hasFocus, setFocus] = useState(false);
  return (
    <SearchWrapper>
      <label htmlFor="search">
        <ScreenReaderOnly>Suche</ScreenReaderOnly>
      </label>
      <InputWrapper>
        <LilSearchIcon />
        {hasFocus && (
          <ClearButton
            onClick={() => {
              handleClearSearch();
              setFocus(false);
            }}
          >
            <ScreenReaderOnly>Suche leeren</ScreenReaderOnly>
            <LilDeleteIcon />
          </ClearButton>
        )}
        <input
          id="search"
          name="search"
          placeholder=""
          type="text"
          onChange={event => handleSearch(event)}
          onKeyDown={(event: any) =>
            (event.key === 'Enter' || event.key === 'Escape') &&
            event.target.blur()
          }
          autoComplete="off"
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 50);
          }}
          value={query}
        />
      </InputWrapper>
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  background-color: var(--color-black);
  padding: 10px 15px;
  position: sticky;
  top: 0;
  z-index: 1;

  input {
    padding: 10px 0 10px 45px;
    width: 100%;
    color: inherit;
    border-radius: 22px;
    border: transparent;
    background-color: var(--color-dark-gray);
  }

  input:focus {
    border: none;
    outline: none;
    box-shadow: 0 0 0 2px #fff;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const LilSearchIcon = styled(SearchIcon)`
  height: 25px;
  position: absolute;
  top: 11px;
  color: var(--color-light-gray);
`;

const ClearButton = styled.button`
  padding: 0;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 2px;
  right: 2px;
`;

const LilDeleteIcon = styled(DeleteIcon)`
  color: var(--color-white);
  height: 35px;
`;

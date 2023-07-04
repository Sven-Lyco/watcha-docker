import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch';
import ScrollToTop from '../utils/ScrollToTop';

export default function SettingsPage({
  showTrailer,
  handleSetShowTrailer,
  seenTitle,
  handleSetSeenTitle,
}: any): JSX.Element {
  ScrollToTop();
  return (
    <Wrapper>
      <Header />
      <Main>
        <InfoBox>
          <SettingsWrapper>
            <CenterDiv>
              <p>Trailer anzeigen:</p>
              <ToggleSwitch
                onChange={(event: any) => {
                  handleSetShowTrailer(event);
                }}
                checked={showTrailer}
                id="showTrailer"
                htmlFor="showTrailer"
              />
            </CenterDiv>
            <CenterDiv>
              <p>gesehene Titel anzeigen:</p>
              <ToggleSwitch
                onChange={(event: any) => {
                  handleSetSeenTitle(event);
                }}
                checked={seenTitle}
                id="seenTitle"
                htmlFor="seenTitle"
              />
            </CenterDiv>
          </SettingsWrapper>
        </InfoBox>
      </Main>
      <Navigation />
    </Wrapper>
  );
}

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;
  border-bottom: 1px solid var(--border-color);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px 0 90px;

  h2 {
    text-align: center;
  }
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  p {
    margin: 8px;
    padding: 0px;
    text-align: center;
    hyphens: auto;
    line-height: 1.5;
  }
`;

const InfoBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

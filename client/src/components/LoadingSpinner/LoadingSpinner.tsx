import { MetroSpinner } from 'react-spinners-kit';
import styled from 'styled-components';

export default function LoadingSpinner(): JSX.Element {
  return (
    <Wrapper>
      <MetroSpinner size={40} frontColor="#2BD999" backColor="#454545" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

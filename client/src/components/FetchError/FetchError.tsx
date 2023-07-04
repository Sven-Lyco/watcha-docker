import { GoSync } from 'react-icons/go';
import styled from 'styled-components';
import Button from '../Button/Button';

interface IFetchErrorProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  message?: string;
}

export default function FetchError({
  onClick,
  message,
}: IFetchErrorProps): JSX.Element {
  return (
    <Section>
      <h1>ERROR</h1>
      <p>Irgendetwas funktioniert nicht wie es sollte</p>
      <Button buttonType="normal" onClick={onClick}>
        <GoSync />
        <span>Seite neu laden</span>
      </Button>
      <p>{message}</p>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  p {
    text-align: center;
  }
`;

import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus_icon.svg';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ISVGButtonProps } from '../../shared/types';

export default function AddButton({
  onClick,
  ...buttonProps
}: ISVGButtonProps): JSX.Element {
  return (
    <Button {...buttonProps} onClick={onClick}>
      <StyledPlusIcon />
      <ScreenReaderOnly>zur Watchlist hinzufügen</ScreenReaderOnly>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  padding: 0;
  background-color: transparent;
  color: var(--color-orange);
  font-size: large;
  border: none;
`;

const StyledPlusIcon = styled(PlusIcon)`
  background-color: rgba(18, 18, 18, 0.6);
  border-radius: 50%;
`;

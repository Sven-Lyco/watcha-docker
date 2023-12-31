import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete_icon.svg';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ISVGButtonProps } from '../../shared/types';

export default function DeleteButton({
  onClick,
  ...buttonProps
}: ISVGButtonProps): JSX.Element {
  return (
    <Button {...buttonProps} onClick={onClick}>
      <StyledDeleteIcon />
      <ScreenReaderOnly>von Watchlist entfernen</ScreenReaderOnly>
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
  color: var(--color-red);
  font-size: large;
  border: none;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  background-color: rgba(18, 18, 18, 0.6);
  color: #f25c78;
  border-radius: 50%;
`;

import { GoSync } from 'react-icons/go';
import styled from 'styled-components';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ISVGButtonProps } from '../../shared/types';

export default function ReloadButton({
  onClick,
  ...buttonProps
}: ISVGButtonProps): JSX.Element {
  return (
    <Button {...buttonProps} onClick={onClick}>
      <StyledReloadIcon />
      <ScreenReaderOnly>Seite neu laden</ScreenReaderOnly>
    </Button>
  );
}

const Button = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  padding: 0;
  border: none;
  color: var(--color-blue);
  background-color: rgba(18, 18, 18, 0.6);
`;

const StyledReloadIcon = styled(GoSync)`
  height: 40px;
  width: 40px;
`;

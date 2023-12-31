import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '../../assets/icons/check_icon.svg';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { ISVGButtonProps } from '../../shared/types';

export default function ButtonCheck({
  onClick,
  isActive,
  ...buttonProps
}: ISVGButtonProps): JSX.Element {
  return (
    <Button {...buttonProps} onClick={onClick} isActive={isActive}>
      <StyledIcon />
      <ScreenReaderOnly>
        {isActive ? 'bereits gesehen' : 'noch nicht gesehen'}
      </ScreenReaderOnly>
    </Button>
  );
}

const Button = styled.button<{ isActive: boolean | undefined }>`
  display: flex;
  padding: 0;
  margin-right: 12px;
  background-color: transparent;
  color: ${({ isActive }) =>
    isActive ? 'var(--color-green)' : 'var(--color-light-gray)'};
  border: none;
`;

const StyledIcon = styled(CheckIcon)`
  background-color: rgba(18, 18, 18, 0.4);
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

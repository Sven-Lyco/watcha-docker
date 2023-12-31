import styled, { css } from 'styled-components';
import { IButtonProps } from '../../shared/types';

export default function Button({
  onClick,
  buttonType,
  children,
  ...buttonProps
}: IButtonProps): JSX.Element {
  return (
    <StyledButton {...buttonProps} onClick={onClick} buttonType={buttonType}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ buttonType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 50px;
  margin: 15px;
  padding: 15px;
  border-radius: 10px;
  border: none;
  font-size: 1em;

  ${({ buttonType }) =>
    buttonType === 'normal' &&
    css`
      background-color: var(--color-light-gray);
      color: var(--color-black);
    `}

  ${({ buttonType }) =>
    buttonType === 'neueFische' &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgb(255, 90, 54);
    `}
		
  ${({ buttonType }) =>
    buttonType === 'green' &&
    css`
      color: var(--color-black);
      background-color: var(--color-green);
    `}
		
	${({ buttonType }) =>
    buttonType === 'red' &&
    css`
      color: var(--color-black);
      background-color: var(--color-red);
    `}
`;

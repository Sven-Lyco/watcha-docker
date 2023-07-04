import styled from 'styled-components';
import ScreenReaderOnly from '../ScreenReaderOnly';

interface IToggleSwitchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  id: string;
  htmlFor: string;
}

export default function ToggleSwitch({
  onChange,
  checked,
  id,
  htmlFor,
}: IToggleSwitchProps): JSX.Element {
  return (
    <CheckBoxWrapper>
      <CheckBox id={id} type="checkbox" checked={checked} onChange={onChange} />
      <CheckBoxLabel htmlFor={htmlFor}>
        <ScreenReaderOnly>CheckBox</ScreenReaderOnly>
      </CheckBoxLabel>
    </CheckBoxWrapper>
  );
}

const CheckBoxWrapper = styled.div`
  position: relative;
  height: 30px;
  margin-top: 0;
  align-items: center;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  border: 1px solid var(--color-green);
  background: var(--color-dark-gray);
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: var(--color-green);
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: var(--color-green);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
      background: var(--color-dark-gray);
    }
  }
`;

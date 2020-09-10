import React from 'react';

import { Container, StyledRawLabel, StyledRawInput } from './styles';

type InputOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface IInputProps {
  label?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: InputOnChangeEvent;
}

const Input: React.FC<IInputProps> = ({ label, value, onChange }) => {
  return (
    <Container>
      <StyledRawLabel>{label}</StyledRawLabel>
      <StyledRawInput type="text" value={value || ''} onChange={onChange} />
    </Container>
  );
};

export default Input;

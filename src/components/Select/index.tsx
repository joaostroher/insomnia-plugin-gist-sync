import React from 'react';

import { Container, StyledRawLabel, StyledRawSelect } from './styles';

type SelectOnChangeEvent = (
  event: React.ChangeEvent<HTMLSelectElement>,
) => void;

interface ISelectOption {
  label: string;
  value: string | null;
}

interface ISelectProps {
  label?: string | null | undefined;
  options: ISelectOption[];
  value?: string | null | undefined;
  onChange?: SelectOnChangeEvent;
}

const Select: React.FC<ISelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <Container>
      <StyledRawLabel>{label}</StyledRawLabel>
      <StyledRawSelect value={value || ''} onChange={onChange}>
        {options.map(option => (
          <option key={option.value || ''} value={option.value || ''}>
            {option.label}
          </option>
        ))}
      </StyledRawSelect>
    </Container>
  );
};

export { ISelectOption };
export default Select;

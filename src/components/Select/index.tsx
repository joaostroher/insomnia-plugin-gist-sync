import React from 'react';

import { containerStyle, labelStyle, selectStyle } from './styles';

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
  defaultValue?: string | number | undefined;
  onChange?: SelectOnChangeEvent;
}

const Select: React.FC<ISelectProps> = ({
  label,
  options,
  value,
  onChange,
  defaultValue,
}) => {
  return (
    <div css={containerStyle}>
      <label css={labelStyle}>{label}</label>
      <select
        css={selectStyle}
        value={value || ''}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map(option => (
          <option key={option.value || ''} value={option.value || ''}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { ISelectOption };
export default Select;

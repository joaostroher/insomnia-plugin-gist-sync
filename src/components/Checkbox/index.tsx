import React from 'react';

import { containerStyle, inputStyle } from './styles';

type InputOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface IInputProps {
  label?: string | null | undefined;
  value?: boolean | null | undefined;
  placeholder?: string;
  onChange?: InputOnChangeEvent;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div css={containerStyle}>
      <label className="inline-block">
        <input
          css={inputStyle}
          type="checkbox"
          checked={value || false}
          placeholder={placeholder}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Input;

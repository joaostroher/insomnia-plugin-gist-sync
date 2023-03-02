import React from 'react';

import { containerStyle, inputStyle, labelStyle } from './styles';

type InputOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface IInputProps {
  label?: string | null | undefined;
  value?: string | null | undefined;
  disabled?: boolean | null | undefined;
  placeholder?: string;
  onChange?: InputOnChangeEvent;
  type?: 'text' | 'password';
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  disabled,
  type = 'text',
}) => {
  return (
    <div css={containerStyle}>
      <label css={labelStyle}>{label}</label>
      <input
        css={inputStyle}
        type={type}
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled || false}
      />
    </div>
  );
};

export default Input;

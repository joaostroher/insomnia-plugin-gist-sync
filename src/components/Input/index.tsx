import React from 'react';

import { containerStyle, inputStyle, labelStyle } from './styles';

type InputOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface IInputProps {
  label?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: InputOnChangeEvent;
}

const Input: React.FC<IInputProps> = ({ label, value, onChange }) => {
  return (
    <div css={containerStyle}>
      <label css={labelStyle}>{label}</label>
      <input
        css={inputStyle}
        type="text"
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

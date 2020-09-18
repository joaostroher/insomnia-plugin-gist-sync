import React, { MouseEventHandler } from 'react';

import { buttonStyle } from './styles';

interface IButtonProps {
  label?: string | null | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  closeModal?: boolean;
}

const Button: React.FC<IButtonProps> = ({ label, onClick, closeModal }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-close-modal={closeModal}
      css={buttonStyle}
    >
      {label}
    </button>
  );
};

export default Button;

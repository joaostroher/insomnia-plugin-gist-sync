import React, { MouseEventHandler } from 'react';

import { StyledButton } from './styles';

interface IButtonProps {
  label?: string | null | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  closeModal?: boolean;
}

const Button: React.FC<IButtonProps> = ({ label, onClick, closeModal }) => {
  return (
    <StyledButton onClick={onClick} data-close-modal={closeModal}>
      {label}
    </StyledButton>
  );
};

export default Button;

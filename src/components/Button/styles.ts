import styled from 'styled-components';

export const StyledButton = styled.button.attrs({
  type: 'button',
})`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 7px;
  border-radius: 3px;
  margin: 5px 0;

  &:hover {
    background-color: #fff;
  }

  &:active {
    background-color: rgba(198, 198, 198, 0.5);
  }
`;

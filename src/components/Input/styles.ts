import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRawLabel = styled.label`
  font-weight: bold;
  padding-bottom: 5px;
`;

export const StyledRawInput = styled.input`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 7px;
  border-radius: 3px;
  margin: 0;

  &:focus {
    background-color: #fff;
  }
`;

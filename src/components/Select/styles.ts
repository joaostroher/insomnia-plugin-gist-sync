import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRawLabel = styled.label`
  font-weight: bold;
  padding-bottom: 5px;
`;

export const StyledRawSelect = styled.select`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 7px;
  border-radius: 3px;

  &:focus {
    background-color: #fff;
  }
`;

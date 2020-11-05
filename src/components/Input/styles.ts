import { css } from '@emotion/core';

export const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

export const labelStyle = css`
  font-weight: bold;
  padding-bottom: 5px;
`;

export const inputStyle = css`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 7px;
  border-radius: 3px;
  margin: 0;
  color: #333333;

  &:focus {
    background-color: #fff;
  }
`;

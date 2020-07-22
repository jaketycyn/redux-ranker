import React from "react";
import styled, { css } from "styled-components";

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px 4px;
  height: 300px;

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.4);
  }
`;

import React from "react";
import styled, { css } from "styled-components";

export const StyledBaseTitle = styled.h1`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
  margin: 0.5em;
  align-items: center;
  text-align: center;
  justify-self: center;
  font-size: 1rem;
  font-weight: 700;
  color: black;
  padding-top: 0.5rem;
  overflow: hidden;

  @media ${(props) => props.theme.mediaQueries.md} {
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.mediaQueries.lg} {
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.mediaQueries.xl} {
    font-size: 2rem;
  }
`;

export const StyledTitle = ({ primary, children }) => {
  return <StyledBaseTitle primary={primary}>{children}</StyledBaseTitle>;
};

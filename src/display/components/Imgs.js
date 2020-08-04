import React from "react";
import styled from "styled-components";

export const StyledImg = styled.img`
  width: 100%;
  height: auto;
  margin: 2px;
  max-width: 12em;
  display: flex;

  @media ${(props) => props.theme.mediaQueries.md} {
    max-width: 14em;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    max-width: 16em;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    max-width: 18em;
  }
`;

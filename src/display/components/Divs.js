import React from "react";
import styled from "styled-components";

const StyledBaseDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(450px, 40%) 1fr;
`;

export const BaseDiv = ({ primary, children }) => {
  return <StyledBaseDiv primary={primary}>{children}</StyledBaseDiv>;
};

// padding bottom must always = the height of BotNavWrapper
export const GreaterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 2em;

  @media ${(props) => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(auto-fill, minmax(19em, 1fr));
  }
  @media ${(props) => props.theme.mediaQueries.lg} {
    grid-template-columns: repeat(auto-fill, minmax(28em, 1fr));
  }
  @media ${(props) => props.theme.mediaQueries.xl} {
  }
`;

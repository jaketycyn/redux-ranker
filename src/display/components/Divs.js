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
  grid-gap: 1em;
  padding-bottom: 3em;
`;

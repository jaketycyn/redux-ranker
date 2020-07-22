import React from "react";
import styled, { css } from "styled-components";

const StyledBaseDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 40%) 1fr;
`;

export const BaseDiv = ({ primary, children }) => {
  return <StyledBaseDiv primary={primary}>{children}</StyledBaseDiv>;
};

export const GreaterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;

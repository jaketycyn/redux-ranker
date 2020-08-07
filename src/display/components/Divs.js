import React from "react";
import styled, { css } from "styled-components";

const StyleBaseDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(6.25em, 20%) 1fr;
  grid-gap: 2px;
  margin: 0.1rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.whiteColor};
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }

  @media ${(props) => props.theme.mediaQueries.sm} {
    grid-template-columns: minmax(7em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.md} {
    grid-template-columns: minmax(9em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    grid-template-columns: minmax(12.5em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    grid-template-columns: minmax(16em, 40%) 1fr;
  }

  ${({ reviewPage }) =>
    reviewPage &&
    css`
      @media ${(props) => props.theme.mediaQueries.sm} {
        grid-template-columns: minmax(7em, 40%) 1fr;
      }

      @media ${(props) => props.theme.mediaQueries.md} {
        grid-template-columns: minmax(9em, 30%) 1fr;
      }

      @media ${(props) => props.theme.mediaQueries.lg} {
        grid-template-columns: minmax(12.5em, 25%) 1fr;
      }

      @media ${(props) => props.theme.mediaQueries.xl} {
        grid-template-columns: minmax(16em, 20%) 1fr;
      }
    `}
`;

export const StyledBaseDiv = ({ primary, reviewPage, children }) => {
  return (
    <StyleBaseDiv
      primary={primary}
      reviewPage={reviewPage}
      name="StyledBaseDiv"
    >
      {children}
    </StyleBaseDiv>
  );
};

export const StyledContentDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 70% 30%;
  max-height: 30em;
`;

// padding bottom must always = the height of BotNavWrapper
export const GreaterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 2em;
  background-color: ${(props) => props.theme.colors.mainBlack};

  @media ${(props) => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(auto-fill, minmax(19em, 1fr));
  }
  @media ${(props) => props.theme.mediaQueries.lg} {
    grid-template-columns: repeat(auto-fill, minmax(28em, 1fr));
  }
  @media ${(props) => props.theme.mediaQueries.xl} {
  }
`;

export const ItemGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  justify-content: center;
`;

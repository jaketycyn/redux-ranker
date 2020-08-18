import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  /* border: none; */
  width: 7em;
  height: 2em;
  text-align:center;
  background: #ffffff;
  line-height: 0;
  color: black !important;
  font-weight: 800;
  font-size: .5rem;
  text-transform: uppercase;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
  background-color: ${(props) => props.theme.colors.whiteColor};
  /* example for changing one style property based on a property call of an item in this case primary:
  background-color: ${(props) => (props.primary ? "red" : "white")}; */

/* example for other ways if you need multiple properties changed via a props.primary/secondary etc
  ${({ primary }) =>
    primary &&
    css`
      background-color: palevioletred;
      color: white;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0, 0.8);
    `} */
  

  &:hover {
    color: ${(props) => props.theme.colors.mainBlack}; 
    background-color: ${(props) => props.theme.colors.main};
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  
}

  ${({ add }) =>
    add &&
    css`
      width: 7em;
      height: 2em;
      margin: 0.25em;
      padding: 1em;

      font-size: 900;
      font-weight: 800;
      align-items: center;
      align-self: center;
      justify-self: center;
    `}
  
    ${({ choose }) =>
      choose &&
      css`
        width: 7em;
        height: 3em;
        font-size: 900;
        margin-top: 0.25em;
        margin: 1em;
      `}

  ${({ details }) =>
    details &&
    css`
      width: 7em;
      height: 2em;
      margin: 0.25em;
      padding: 1em;

      font-size: 900;
      font-weight: 800;
      align-items: center;
      align-self: center;
      justify-self: center;
    `}

    


/*Media Queries */
    
`;

export const Button = ({
  primary,
  add,
  details,
  choose,
  children,
  onClick,
}) => {
  return (
    <StyledButton
      add={add}
      primary={primary}
      details={details}
      choose={choose}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

const StyledReviewButton = styled.button`
  /* border: none; */
  width: 5rem;
  height: 2rem;
  text-align: center;
  background: white;
  line-height: 0;
  color: black !important;
  background-color: ${(props) => props.theme.colors.whiteColor};
  font-weight: 800;
  font-size: 0.5rem;
  text-transform: uppercase;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.2);

  &:hover {
    color: ${(props) => props.theme.colors.mainBlack} !important;
    background-color: ${(props) => props.theme.colors.main} !important;
    background: none;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  }

  @media ${(props) => props.theme.mediaQueries.md} {
    width: 6rem;
    height: 2.25rem;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    width: 8rem;
    height: 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    width: 8rem;
    height: 3rem;
  }

  ${({ remove }) =>
    remove &&
    css`
      margin-top: 5em;
      margin: 1em;
    `}

  ${({ reRank }) =>
    reRank &&
    css`
      margin-top: 5em;
      margin: 1em;
    `}
`;

export const ReviewPageButton = ({ remove, reRank, onClick, children }) => {
  return (
    <StyledReviewButton remove={remove} reRank={reRank} onClick={onClick}>
      {children}
    </StyledReviewButton>
  );
};

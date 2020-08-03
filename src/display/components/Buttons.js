import React from "react";
import styled, { css } from "styled-components";
const StyledButton = styled.button`
  /* border: none; */
  width: 7em;
  height: 2em;
  text-align:center;
  background: #ffffff;
  line-height: 0;
  color: #404040 !important;
  font-weight: 800;
  font-size: .5rem;
  text-transform: uppercase;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
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
    color: #f8efe8 !important;
    background-color: #8dccd3 !important;
  background: none;
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
      background-color: ${(props) => props.theme.colors.secondary};
      font-size: 900;
      font-weight: 800;
      align-items: center;
      align-self: center;
      justify-self: center;
    `}
  
    ${({ choose }) =>
      choose &&
      css`
        width: 7rem;
        height: 3rem;
        background-color: ${(props) => props.theme.colors.secondary};
        font-size: 900;
        margin-top: 5em;
        margin: 1em;
      `}

  ${({ details }) =>
    details &&
    css`
      width: 7em;
      height: 2em;
      margin: 0.25em;
      padding: 1em;
      background-color: ${(props) => props.theme.colors.main};
      font-size: 900;
      font-weight: 800;
      align-items: center;
      align-self: center;
      justify-self: center;
    `}

  ${({ remove }) =>
    remove &&
    css`
      width: 7rem;
      height: 3rem;
      background-color: red;
      font-size: 900;
      margin-top: 5em;
      margin: 1em;
    `}

    ${({ reRank }) =>
      reRank &&
      css`
        width: 7rem;
        height: 3rem;
        background-color: green;
        font-size: 900;
        margin-top: 5em;
        margin: 1em;
      `}

`;

export const Button = ({
  primary,
  add,
  details,
  choose,
  remove,
  reRank,
  children,
  onClick,
}) => {
  return (
    <StyledButton
      add={add}
      primary={primary}
      details={details}
      choose={choose}
      remove={remove}
      reRank={reRank}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

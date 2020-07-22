import React from "react";
import styled, { css } from "styled-components";
const StyledButton = styled.button`
  /* border: none; */
  background: #ffffff;
  color: #404040 !important;
  font-weight: 300;
  text-transform: uppercase;
  border-radius: 6px;
  padding: 1.5rem 2.5rem;
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
      background-color: lightgreen;
      font-size: 900;
      margin: 0.25rem;
      padding: 1rem;
    `}
  
    ${({ details }) =>
      details &&
      css`
        background-color: red;
        font-size: 900;
        margin: 0.25rem;
      `}

      ${({ choose }) =>
        choose &&
        css`
          background-color: magenta;
          font-size: 900;
          margin: 0.25rem;
        `}


      ${({ remove }) =>
        remove &&
        css`
          background-color: yellow;
          font-size: 900;
          margin: 0.25rem;
        `}

`;

export const Button = ({
  primary,
  add,
  details,
  choose,
  remove,
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
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

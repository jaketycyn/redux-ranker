import React from "react";
import styled, { css } from "styled-components";
const StyledButton = styled.button`
  border: none;
  background: #ffffff;
  color: #404040 !important;
  font-weight: 100;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.2);
  transition: all 0.3s ease 0s;
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
  font-weight: 700 !important;
  letter-spacing: 3px;
  background: none;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.3s ease 0s;
}
  
`;

export const Button = ({ primary, children }) => {
  return <StyledButton primary={primary}>{children}</StyledButton>;
};

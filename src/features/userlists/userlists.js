import React, { useState } from "react";
import styled from "styled-components";

const StyledUserListsPage = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: ${(props) => props.theme.colors.whiteColor};
  text-align: center;
  justify-content: center;
`;

const Userlists = () => {
  const [lists, setLists] = useState([]);
  function createList(e) {
    const newListTitle = prompt("Enter list name");
    console.log(newListTitle);
    setLists((lists) => [...lists, newListTitle]);
  }
  return (
    <div>
      <StyledUserListsPage>
        <div>
          <button onClick={() => createList()}>Create new list</button>
        </div>
        <ul>
          {lists.map((item) => (
            <p>{item}</p>
          ))}
        </ul>
      </StyledUserListsPage>
    </div>
  );
};

export default Userlists;

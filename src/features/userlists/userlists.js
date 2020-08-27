import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  addList,
  resetListStatus,
  activateListStatus,
  movielistSelector,
} from "../../redux/slices/movielistSlice";

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
  const { movielists } = useSelector(movielistSelector);
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    console.log(location);
    dispatch(resetListStatus());
  }, [location]);
  function createList(e) {
    const newListTitle = prompt("Enter list name");
    console.log(newListTitle);
    setLists((lists) => [...lists, newListTitle]);
    dispatch(addList({ listName: newListTitle }));
  }

  function handleClick(listName) {
    history.push("/createList");
    console.log(listName);
    dispatch(activateListStatus({ listName }));
  }
  return (
    <div>
      <StyledUserListsPage>
        <div>
          <button onClick={() => createList()}>Create new list</button>
        </div>
        <ul>
          {movielists.map((item) => (
            <button type="button" onClick={() => handleClick(item.listName)}>
              {item.listName}
            </button>
          ))}
        </ul>
      </StyledUserListsPage>
    </div>
  );
};

export default Userlists;

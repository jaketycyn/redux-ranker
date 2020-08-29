import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";

import {
  addList,
  deleteList,
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
    if (newListTitle !== null) {
      const trimmedTitle = newListTitle.trim();
      if (
        newListTitle !== null &&
        trimmedTitle.length >= 1 &&
        newListTitle.length >= 1
      ) {
        setLists((lists) => [...lists, newListTitle]);
        dispatch(addList({ listName: newListTitle, listId: uuid() }));
      }
    }
  }

  function handleClick(listName) {
    history.push("/createList");
    console.log(listName);
    dispatch(activateListStatus({ listName }));
  }

  function handleDelete(listName, id) {
    console.log(listName);
    dispatch(deleteList({ listName, id }));
  }

  return (
    <div>
      <StyledUserListsPage>
        <div>
          <button onClick={() => createList()}>Create new list</button>
        </div>
        <ul>
          {movielists.map((item) => (
            <div>
              <button type="button" onClick={() => handleClick(item.listName)}>
                {item.listName}
              </button>
              <button onClick={() => handleDelete(item.listName, item.id)}>
                Delete
              </button>
            </div>
          ))}
        </ul>
      </StyledUserListsPage>
    </div>
  );
};

export default Userlists;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import jsondata from "../../data.json";
import {
  fetchMovies,
  movielistSelector,
} from "../../app/slices/movielistSlice";
import { addItem } from "../../app/slices/searchAddSlice";

import AddIcon from "@material-ui/icons/Add";
import { TextField } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab/";

//https://github.com/react-hook-form/react-hook-form/tree/master/examples
//Using on blur for when users click out of the 'search box' to click on items to add to their unranked list

function CreateList() {
  const { handleSubmit, control, errors } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const onSubmit = (data) => {
    //console.log(data.TextField);

    const newjsondata = movies.filter((item) => item.title === data.TextField);

    console.log(movies);
    setSearchList(newjsondata);

    //console.log(newjsondata);
    //console.log(jsondata);
    //.log("searchlist:" + searchList);
  };

  function StandardToggleButton() {
    const [selected, setSelected] = useState(false);

    if (selected === true) {
      const selectedItem = searchList.filter((item) => item.selected === true);
      console.log("selected item");
      console.log(selectedItem);
      dispatch(addItem({}));
    }
    console.log(searchList);
    return (
      <ToggleButton
        value={"stuff"}
        selected={selected}
        style={
          selected ? { background: "lightgreen" } : { background: "white" }
        }
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <AddIcon />
      </ToggleButton>
    );
  }
  function SearchList() {
    return (
      <div>
        <h2>User Search List</h2>
        {searchList.map((item) => {
          return (
            <div>
              <h1>{item.title}</h1>
              <StandardToggleButton value={item} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Option 1: pass a component to the Controller. */}
          <Controller
            as={TextField}
            name="TextField"
            control={control}
            defaultValue=""
            variant="outlined"
          />

          {/* Option 2: use render props to assign events and value */}

          <Controller name="TextField" control={control} />
          {errors.TextField && <p>Can't submit blank</p>}
        </div>
        <input type="submit" />
        <div>
          <SearchList />
        </div>
      </form>
    </div>
  );
}

export default CreateList;

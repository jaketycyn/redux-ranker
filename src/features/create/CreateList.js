import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import jsondata from "../../data.json";

import { searchAddSelector } from "../../app/slices/searchAddSlice";

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
  const { loading, hasErrors, itemTitles } = useSelector(searchAddSelector);

  const [searchList, setSearchList] = useState([]);
  const [unrankedList, setUnrankedList] = useState([]);

  const onSubmit = (data) => {
    //console.log(data.TextField);

    const newjsondata = jsondata.filter(
      (item) => item.title === data.TextField
    );
    console.log("searchlist:" + searchList);
    setSearchList(newjsondata);
    console.log(newjsondata);
    console.log(jsondata);
    console.log("searchlist:" + searchList);
  };

  function StandardToggleButton(props) {
    const [selected, setSelected] = useState(false);

    if (selected === true) {
      unrankedList.push(props);
      console.log(unrankedList);
    }
    return (
      <ToggleButton
        value={props.item}
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

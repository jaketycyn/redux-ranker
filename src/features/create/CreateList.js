import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import jsondata from "../../data.json";

import CheckIcon from "@material-ui/icons/Check";
import { TextField, ToggleButton } from "@material-ui/core";

//https://github.com/react-hook-form/react-hook-form/tree/master/examples
//Using on blur for when users click out of the 'search box' to click on items to add to their unranked list

function CreateList() {
  const { handleSubmit, control, reset, errors } = useForm({
    mode: "onBlur",
  });

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

  function ToggleButton() {
    const [selected, setSelected] = useState(false);
    return (
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <CheckIcon />
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
              <ToggleButton />
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

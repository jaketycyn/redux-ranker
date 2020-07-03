import React from "react";
import { useForm } from "react-hook-form";
import jsondata from "../../data.json";

//https://github.com/react-hook-form/react-hook-form/tree/master/examples
//Using on blur for when users click out of the 'search box' to click on items to add to their unranked list

function CreateList() {
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="searchAdd">Search</label>
          <input
            name="searchAdd"
            placeholder="itemTitle"
            ref={register({ required: true })}
          />
          {errors.searchAdd && <p>Can't submit blank</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateList;

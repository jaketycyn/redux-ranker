import React, { useState } from "react";
import useStyles from "../../display/styles/MUIstyles";

const Search = ({ getQuery }) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    // <div className={classes.search}>
    //   <form>
    //     <input
    //       type="text"
    //       placeholder="Search movies..."
    //       value={text}
    //       onChange={(e) => onChange(e.target.value)}
    //       autoFocus
    //     />
    //   </form>
    // </div>
    <div
      className=" bg-grey-900 relative w-3/4 bg-white shadow-xl m-4 p-2"
      id="search-content"
    >
      <div className=" container mx-2 py-2 text-black bg-grey-900">
        <input
          id="searchfield"
          type="search"
          placeholder="Search..."
          autoFocus="autofocus"
          onChange={(e) => onChange(e.target.value)}
          className="bg-grey-900 w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl"
        />
      </div>
    </div>
  );
};

export default Search;

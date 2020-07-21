import React, { useState } from "react";
import useStyles from "../../display/styles/MUIstyles";
import "../../assets/main.css";

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
      className="bg-grey-900 relative w-full hidden bg-white shadow-xl"
      id="search-content"
    >
      <div className="container mx-auto py-4 text-black bg-grey-900">
        <input
          id="searchfield"
          type="search"
          placeholder="Search..."
          autoFocus="autofocus"
          className="bg-grey-900 w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl"
        />
      </div>
    </div>
  );
};

export default Search;

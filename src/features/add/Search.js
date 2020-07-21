import React, { useState } from "react";
import useStyles from "../../display/styles/MUIstyles";

const Search = ({ getQuery }) => {
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    <div className={classes.search}>
      <form>
        <input
          type="text"
          placeholder="Search movies..."
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Search;

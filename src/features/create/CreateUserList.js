import React, { useState, useEffect } from "react";
import Axios from "axios";
import jsonData from "../../data.json";
import ItemGrid from "../../display/components/ItemGrid";

const CreateUserList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await Axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=c32b7d32a9f8362ea4ff9e65f33225d1`

        //ex: fightclub
        //https://api.themoviedb.org/3/movie/550?api_key=c32b7d32a9f8362ea4ff9e65f33225d1
      );

      console.log(result.data.results);
      setItems(result.data.results);
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Search getQuery={(q) => setQuery(q)} />
      <ItemGrid isLoading={isLoading} items={items} />
    </div>
  );
};

const Search = ({ getQuery }) => {
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={text}
          placeholder="search for item"
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CreateUserList;

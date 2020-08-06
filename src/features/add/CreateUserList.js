import React, { useState, useEffect } from "react";
import Axios from "axios";
import { ItemGridWrapper } from "../../display/components/Divs";
import ItemGrid from "../../display/components/ItemGrid";
import BotNavbar from "../../display/layouts/BotNavbar";
import Search from "./Search";

const CreateUserList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemQuery, setItemQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await Axios(
        // `https://api.themoviedb.org/3/movie/popular?api_key=c32b7d32a9f8362ea4ff9e65f33225d1`

        `
        https://api.themoviedb.org/3/search/movie?api_key=c32b7d32a9f8362ea4ff9e65f33225d1&language=en-US&query=${itemQuery}&page=1&include_adult=false`

        //ex: fightclub
        //https://api.themoviedb.org/3/movie/550?api_key=c32b7d32a9f8362ea4ff9e65f33225d1

        //c32b7d32a9f8362ea4ff9e65f33225d1
      );

      //simple filter to remove non image results
      const APIresults = result.data.results;
      const filteredResults = APIresults.filter(
        (item) => item.poster_path !== null
      );
      // console.log(filteredResults);
      // console.log("api results");
      // console.log(APIresults);
      setItems(filteredResults);
      setIsLoading(false);
    };

    fetchItems();
  }, [itemQuery]);
  // component that use to be below taking out to test css scaling
  //<Search getQuery={(q) => setItemQuery(q)} />
  console.log(items);
  return (
    <ItemGridWrapper>
      <Search getQuery={(q) => setItemQuery(q)} />
      <ItemGrid isLoading={isLoading} items={items} />
      <BotNavbar />
    </ItemGridWrapper>
  );
};

export default CreateUserList;

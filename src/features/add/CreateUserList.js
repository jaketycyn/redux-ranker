import React, { useState, useEffect } from "react";
import Axios from "axios";
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
        `https://api.themoviedb.org/3/movie/popular?api_key=c32b7d32a9f8362ea4ff9e65f33225d1`

        // `
        // https://api.themoviedb.org/3/search/movie?api_key=c32b7d32a9f8362ea4ff9e65f33225d1&language=en-US&query=${itemQuery}&page=1&include_adult=false`
        //name/title = ${}
        //ex: fightclub
        //https://api.themoviedb.org/3/movie/550?api_key=c32b7d32a9f8362ea4ff9e65f33225d1

        //c32b7d32a9f8362ea4ff9e65f33225d1
      );

      console.log(result.data.results);

      setItems(result.data.results);
      setIsLoading(false);
    };

    fetchItems();
  }, [itemQuery]);
  // component that use to be below taking out to test css scaling
  //<Search getQuery={(q) => setItemQuery(q)} />
  return (
    <div>
      <ItemGrid isLoading={isLoading} items={items} />
      <BotNavbar />
    </div>
  );
};

// const SearchBar = ({ getQuery }) => {
//   const [text, setText] = useState("");

//   const onChange = (e) => {
//     e.preventDefault();
//     setText();
//     getQuery();
//   };
//   return (
//     <div>
//       <form>
//         <input
//           type="text"
//           value={text}
//           placeholder="search for item"
//           autoFocus
//           onChange={onChange}
//         />
//       </form>
//     </div>
//   );
// };

export default CreateUserList;

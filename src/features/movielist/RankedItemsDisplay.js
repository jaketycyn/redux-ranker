import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  movielistSelector,
} from "../../app/slices/movielistSlice";

const RankedItemsDisplay = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  let rankedMovies = movies.filter((movie) => movie.rank >= 1);
  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };
    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const moviesSortedByRank = rankedMovies
    .slice()
    .sort(sort_by("rank", false, parseInt));

  const DisplayItems = () => {
    console.log("displaying all ranked items in order");
    console.log(moviesSortedByRank);
  };
  return (
    <div>
      <button onClick={DisplayItems}>RankedItemsDisplay</button>
      <div display={false}>
        {moviesSortedByRank.map((movie) => {
          return <div>{movie.title}</div>;
        })}
      </div>
    </div>
  );
};

export default RankedItemsDisplay;

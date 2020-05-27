import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//move /reorganize slices and app folder or this movielist folder to a more appropriate area
import {
  fetchMovies,
  movielistSelector,
} from "../../app/slices/movielistSlice";
import { Movie } from "./Movie";

const MovieList = () => {
  const dispatch = useDispatch();
  const { loading, hasErrors, movies } = useSelector(movielistSelector);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;
    console.log(movies);

    let unrankedMovies = movies.filter((movie) => movie.rank < 1);

    //console.log("unranked movies:" + unrankedMovies);

    //need to figure out what to do with only 1 movie being rendered and how to go about adding in new movies at increasing rank values. Possibly going for a new splice based upon a middle ranking method permeating outwards
    if (unrankedMovies.length >= 2) {
      return unrankedMovies
        .slice(0, 2)
        .map((movie) => <Movie key={movie.id} movie={movie} id={movie.id} />);
    } else {
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
      let moviesSorted = movies.slice().sort(sort_by("rank", true, parseInt));
      console.log(movies);
      console.log(moviesSorted);

      return moviesSorted.map((movie) => (
        <Movie key={movie.id} movie={movie} id={movie.id} />
      ));
    }
  };
  return (
    <section>
      <h1>Movies</h1>
      {renderMovies()}
    </section>
  );
};

export default MovieList;

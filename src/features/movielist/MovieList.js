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

    let unrankedMovies = movies.filter((movie) => movie.rank < 1);
    let rankedMovies = movies.filter((movie) => movie.rank >= 1);
    console.log("ranked movies array:", rankedMovies);
    console.log("unranked movies array:", unrankedMovies);
    //show 2 unranked movies until 1 movie is ranked. THis ranked movie becomes basis of comparison for future movies.

    if (rankedMovies.length === 0) {
      return unrankedMovies
        .slice(0, 2)
        .map((movie) => <Movie key={movie.id} movie={movie} id={movie.id} />);
    } else if (unrankedMovies.length >= 1) {
      // Reusable sort function from:
      // https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values

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
        .sort(sort_by("rank", true, parseInt));

      //Should work for now, but might need to be reconfigured later.
      //KEEP AN EYE ON THIS!
      const midMovieIndex = Math.round(moviesSortedByRank.length / 2);

      console.log(midMovieIndex);

      return (
        <div>
          <div>
            {unrankedMovies.slice(0, 1).map((movie) => (
              <Movie key={movie.id} movie={movie} id={movie.id} />
            ))}
          </div>
          <div>
            {moviesSortedByRank
              .slice(midMovieIndex, midMovieIndex + 1)
              .map((movie) => (
                <Movie key={movie.id} movie={movie} id={movie.id} />
              ))}
          </div>
        </div>
      );
    } else {
      //no unranked movies left
      return <p>No unranked movies</p>;
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

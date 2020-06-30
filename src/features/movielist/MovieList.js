import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//move /reorganize slices and app folder or this movielist folder to a more appropriate area
import {
  fetchMovies,
  movielistSelector,
} from "../../app/slices/movielistSlice";
import { Movie } from "./Movie";
import RankedItemsDisplay from "./RankedItemsDisplay";

const MovieList = () => {
  const dispatch = useDispatch();
  const { loading, hasErrors, movies } = useSelector(movielistSelector);

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
  // variables created for options
  const A = "A";
  const B = "B";

  const [encounter, setEncounter] = useState(0);

  //filtering movies into unranked and ranked
  const unrankedMovies = movies.filter((movie) => movie.rank == 0);
  // console.log("unranked movies array:", unrankedMovies);
  const rankedMovies = movies.filter((movie) => movie.rank >= 1);
  // console.log("ranked movies array:", rankedMovies);
  const moviesSortedByRank = rankedMovies
    .slice()
    // false = reversed order ; lowest # is highest rank
    .sort(sort_by("rank", false, parseInt));

  const nextChallenger = Math.round(moviesSortedByRank.length / 2);

  const unrankedCombatant = unrankedMovies.slice(0, 1);
  //console.log("unranked challenger:" + JSON.stringify(unrankedCombatant, undefined, 2))
  const rankedIncumbent = moviesSortedByRank.slice(
    nextChallenger,
    nextChallenger + 1
  );
  const combatants = unrankedCombatant.concat(rankedIncumbent);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  //

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;

    //unranked matchup display 2 unranked movies - after one is selected, both get assigned ranks
    if (rankedMovies.length === 0) {
      const unRankedMatchup = unrankedMovies.slice(0, 2);
      return (
        <div>
          <div>
            {unRankedMatchup.slice(0, 1).map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                id={movie.id}
                option={A}
                combatants={unRankedMatchup}
                encounter={encounter}
                setEncounter={setEncounter}
              />
            ))}
          </div>
          <div>
            {unRankedMatchup.slice(1, 2).map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                id={movie.id}
                option={B}
                combatants={unRankedMatchup}
                encounter={encounter}
                setEncounter={setEncounter}
              />
            ))}
          </div>
        </div>
      );
    }

    // unranked vs ranked matchup
    else if (unrankedMovies.length >= 1 && rankedMovies.length >= 1) {
      //cloning of unrankedCombatant into unrankedChallenger and giving it a prop. to deem we're in a cycle of ranking
      const activeRankedMovie = moviesSortedByRank.filter(
        (movie) => movie.active === "won" || movie.active === "lost"
      );

      // ! winners bracket
      if (
        activeRankedMovie.length === 1 &&
        activeRankedMovie[0].active === "won"
      ) {
        //code is above copied for easy reading
        // const nextChallenger = Math.round(moviesSortedByRank.length / 2);

        //for every win it will face the mid point of the new array of ranked half way cut above it
        const activeRankedMovieIndex = moviesSortedByRank.findIndex(
          (movies) => movies.rank === activeRankedMovie[0].rank
        );
        console.log("active rank movie index: " + activeRankedMovieIndex);

        const newRankedMoviesList = moviesSortedByRank.slice(
          0,
          activeRankedMovieIndex
        );

        console.log(
          "newRankedMovies list: " +
            JSON.stringify(newRankedMoviesList, undefined, 1)
        );

        // const newMovieIndex = console.log(
        //   "active ranked movie: " +
        //     JSON.stringify(activeRankedMovie[0].rank, undefined, 1)
        // );
        return (
          <div>
            <div>
              {activeRankedMovie.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  id={movie.id}
                  active={movie.active}
                  option={A}
                  combatants={combatants}
                  rankedMovies={moviesSortedByRank}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
              ))}
            </div>
            <div>
              {rankedIncumbent.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  id={movie.id}
                  option={B}
                  combatants={combatants}
                  rankedMovies={moviesSortedByRank}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
              ))}
            </div>
          </div>
        );
      }
      // ! losers bracket
      else if (
        activeRankedMovie.length === 1 &&
        activeRankedMovie[0].active === "lost"
      ) {
        return (
          <p>Movie lost</p>
          // <div>
          //   <div>
          //     {activeRankedMovie.map((movie) => (
          //       <Movie
          //         key={movie.id}
          //         movie={movie}
          //         id={movie.id}
          //         active={movie.active}
          //         option={A}
          //         combatants={combatants}
          //         rankedMovies={moviesSortedByRank}
          //         encounter={encounter}
          //         setEncounter={setEncounter}
          //       />
          //     ))}
          //   </div>
          //   <div>
          //     {rankedIncumbent.map((movie) => (
          //       <Movie
          //         key={movie.id}
          //         movie={movie}
          //         id={movie.id}
          //         option={B}
          //         combatants={combatants}
          //         rankedMovies={moviesSortedByRank}
          //         encounter={encounter}
          //         setEncounter={setEncounter}
          //       />
          //     ))}
          //   </div>
          // </div>
        );
      } else {
        //standard
        return (
          <div>
            <div>
              {unrankedCombatant.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  id={movie.id}
                  active={movie.active}
                  option={A}
                  combatants={combatants}
                  rankedMovies={moviesSortedByRank}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
              ))}
            </div>
            <div>
              {rankedIncumbent.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  id={movie.id}
                  option={B}
                  combatants={combatants}
                  rankedMovies={moviesSortedByRank}
                  encounter={encounter}
                  setEncounter={setEncounter}
                />
              ))}
            </div>
          </div>
        );
      }
    } else {
      //no unranked movies left
      return (
        <p>No unranked movies. Feel free to look through your sorted list </p>
      );
    }
  };
  return (
    <section>
      <h1>Movies</h1>
      {renderMovies()}
      <RankedItemsDisplay />
    </section>
  );
};

export default MovieList;

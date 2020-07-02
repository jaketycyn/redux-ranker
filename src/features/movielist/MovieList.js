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

  const nextChallengerIndex = Math.floor(moviesSortedByRank.length / 2);

  const unrankedCombatant = unrankedMovies.slice(0, 1);
  //console.log("unranked challenger:" + JSON.stringify(unrankedCombatant, undefined, 2))\\
  // console.log("moviesorted by:");
  // console.log(moviesSortedByRank);
  const rankedIncumbent = moviesSortedByRank.slice(
    nextChallengerIndex,
    nextChallengerIndex + 1
  );
  const combatants = unrankedCombatant.concat(rankedIncumbent);

  const activeRankedMovie = moviesSortedByRank.filter(
    (movie) => movie.active === "won" || movie.active === "lost"
  );
  console.log("activeRankedMovie: ");
  console.log(activeRankedMovie);

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
      console.log("Phase !: Unranked vs Unranked");
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
              />
            ))}
          </div>
        </div>
      );
    }

    // unranked vs ranked matchup
    else if (rankedMovies.length >= 1) {
      if (activeRankedMovie.length === 1) {
        const activeRankedMovieIndex = moviesSortedByRank.findIndex(
          (movies) => movies.rank === activeRankedMovie[0].rank
        );
        console.log("active rank movie index: " + activeRankedMovieIndex);

        // ! winners bracket
        if (activeRankedMovie[0].active === "won") {
          console.log("Phase 3.1: ChallengerRanked(Won) vs Ranked");

          const newRankedMoviesList = moviesSortedByRank.slice(
            0,
            activeRankedMovieIndex + 1
          );

          const nextRankedIncumbentIndex = Math.round(
            newRankedMoviesList.length / 2
          );

          const nextRankedIncumbent = newRankedMoviesList.slice(
            nextRankedIncumbentIndex - 1,
            nextRankedIncumbentIndex
          );
          console.log("newrankedmovelist: ");
          console.log(newRankedMoviesList);
          console.log("nextrankedIncumbent");
          console.log(nextRankedIncumbent);

          // const rankedIncumbent = moviesSortedByRank.slice(
          //   nextChallengerIndex,
          //   nextChallengerIndex + 1
          // );
          const updatedCombatants = activeRankedMovie.concat(
            nextRankedIncumbent
          );
          // const combatants = unrankedCombatant.concat(rankedIncumbent);
          {
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
                      combatants={updatedCombatants}
                      rankedMovies={newRankedMoviesList}
                    />
                  ))}
                </div>
                <div>
                  {nextRankedIncumbent.map((movie) => (
                    <Movie
                      key={movie.id}
                      movie={movie}
                      id={movie.id}
                      option={B}
                      combatants={updatedCombatants}
                      rankedMovies={newRankedMoviesList}
                    />
                  ))}
                </div>
              </div>
            );
          }
          // const newMovieIndex = console.log(
          //   "active ranked movie: " +
          //     JSON.stringify(activeRankedMovie[0].rank, undefined, 1)
          // );
        }
        // ! losers bracket
        else if (activeRankedMovie[0].active === "lost") {
          console.log("Phase 3.2: ChallengerRanked(Lost) vs Ranked");
          const newRankedMoviesList = moviesSortedByRank.slice(
            activeRankedMovieIndex,
            moviesSortedByRank.length
          );

          const nextRankedIncumbentIndex = Math.floor(
            newRankedMoviesList.length / 2
          );

          const nextRankedIncumbent = newRankedMoviesList.slice(
            nextRankedIncumbentIndex,
            nextRankedIncumbentIndex + 1
          );
          console.log("newrankedmovelist: ");
          console.log(newRankedMoviesList);
          console.log("nextrankedIncumbent");
          console.log(nextRankedIncumbent);

          // const rankedIncumbent = moviesSortedByRank.slice(
          //   nextChallengerIndex,
          //   nextChallengerIndex + 1
          // );
          const updatedCombatants = activeRankedMovie.concat(
            nextRankedIncumbent
          );

          return (
            <div>
              <p>Movie lost</p>
              <div>
                {activeRankedMovie.map((movie) => (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    id={movie.id}
                    active={movie.active}
                    option={A}
                    combatants={updatedCombatants}
                    rankedMovies={moviesSortedByRank}
                    encounter={encounter}
                    setEncounter={setEncounter}
                  />
                ))}
              </div>
              <div>
                {nextRankedIncumbent.map((movie) => (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    id={movie.id}
                    option={B}
                    combatants={updatedCombatants}
                    rankedMovies={moviesSortedByRank}
                    encounter={encounter}
                    setEncounter={setEncounter}
                  />
                ))}
              </div>
            </div>
          );
        }
      } else if (unrankedMovies.length >= 1) {
        //standard
        console.log("Phase 2: Unranked vs Ranked");
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
                />
              ))}
            </div>
          </div>
        );
      } else {
        console.log("Phase 6: RANKING COMPLETE");
        return (
          <p>All movies ranked. Feel free to look through your sorted list </p>
        );
      }
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

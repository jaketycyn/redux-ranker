import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

  const unrankedItems = movies.filter((movie) => movie.rank === 0);
  const rankedItems = movies.filter((movie) => movie.rank >= 1);
  const rankSortedItems = rankedItems
    .slice()
    // false = reversed order ; lowest # is highest rank
    .sort(sort_by("rank", false, parseInt));

  const nextChallengerIndex = Math.floor(rankSortedItems.length / 2);

  const unrankedCombatant = unrankedItems.slice(0, 1);

  const rankedIncumbent = rankSortedItems.slice(
    nextChallengerIndex,
    nextChallengerIndex + 1
  );
  const combatants = unrankedCombatant.concat(rankedIncumbent);

  const activeRankedMovie = rankSortedItems.filter(
    (movie) => movie.active === "won" || movie.active === "lost"
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  //

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;

    //unranked matchup display 2 unranked movies - after one is selected, both get assigned ranks
    if (rankedItems.length === 0) {
      const unRankedMatchup = unrankedItems.slice(0, 2);
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
    } else if (rankedItems.length >= 1) {
      if (activeRankedMovie.length === 1) {
        const activeRankedMovieIndex = rankSortedItems.findIndex(
          (movies) => movies.rank === activeRankedMovie[0].rank
        );
        console.log("active rank movie index: " + activeRankedMovieIndex);

        // ! winners bracket
        if (activeRankedMovie[0].active === "won") {
          console.log("Phase 3.1: ChallengerRanked(Won) vs Ranked");

          const newRankedMoviesList = rankSortedItems.slice(
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

          const updatedCombatants = activeRankedMovie.concat(
            nextRankedIncumbent
          );

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
                      rankedItems={newRankedMoviesList}
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
                      rankedItems={newRankedMoviesList}
                    />
                  ))}
                </div>
              </div>
            );
          }
        }
        // ! losers bracket
        else if (activeRankedMovie[0].active === "lost") {
          console.log("Phase 3.2: ChallengerRanked(Lost) vs Ranked");
          const newRankedMoviesList = rankSortedItems.slice(
            activeRankedMovieIndex,
            rankSortedItems.length
          );

          const nextRankedIncumbentIndex = Math.floor(
            newRankedMoviesList.length / 2
          );

          const nextRankedIncumbent = newRankedMoviesList.slice(
            nextRankedIncumbentIndex,
            nextRankedIncumbentIndex + 1
          );

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
                    rankedItems={newRankedMoviesList}
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
                    rankedItems={newRankedMoviesList}
                  />
                ))}
              </div>
            </div>
          );
        }
      } else if (unrankedItems.length >= 1) {
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
                  rankedItems={rankSortedItems}
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
                  rankedItems={rankSortedItems}
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

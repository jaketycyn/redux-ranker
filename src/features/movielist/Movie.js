import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../app/slices/movielistSlice";
export const Movie = ({
  movie,
  id,
  option,
  combatants,
  rankedMovies,
  encounter,
  setEncounter,
}) => {
  const dispatch = useDispatch();

  function updateEncounter() {
    // console.log(encounter);
    // setEncounter(encounter++);
    // console.log("updateEncounter test test");
    // console.log(encounter);
    // setEncounter((encounter = 0));
    // console.log(encounter);
  }

  function updateRank() {
    dispatch(
      changeRank({
        id: id,
        option: option,
        combatants: combatants,
        rankedMovies: rankedMovies,
      })
    );
  }

  //function combines
  function combinedUpdater() {
    updateRank();
    updateEncounter();
  }

  return (
    <div>
      <h2>Title: {movie.title}</h2>
      <h3>Rank:{movie.rank}</h3>
      <h4>id: {id}</h4>
      <button
        onClick={
          combinedUpdater
          //,() => ( dispatch(changeRank({id: id, option: option, combatants: combatants, rankedMovies: rankedMovies}))    )
        }
      >
        ChangeRank
      </button>
    </div>
  );
};

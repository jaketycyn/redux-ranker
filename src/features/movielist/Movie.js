import React, {useState}from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../app/slices/movielistSlice";
export const Movie = ({ movie, id, option, combatants, rankedMovies, pickedStatus, changeEncounter }) => {
  const dispatch = useDispatch();
  
  function updateEncounter() {
    console.log('updateEncounter test test')
  }

function updateRank() {
  dispatch(changeRank({id: id, option: option, combatants: combatants, rankedMovies: rankedMovies}))
}

//function cobines
function combinedUpdater() {
  updateRank();
  updateEncounter();
}


  return (
    <div>
      <h2>Title: {movie.title}</h2>
      <h3>Rank:{movie.rank}</h3>
      <h4>id: {id}</h4>
      <button onClick={
        combinedUpdater
        //,() => ( dispatch(changeRank({id: id, option: option, combatants: combatants, rankedMovies: rankedMovies}))    ) 
      
      
      }
        
        
        >ChangeRank</button>
    </div>
  );
    }

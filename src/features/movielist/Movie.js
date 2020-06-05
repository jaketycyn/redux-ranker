import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../app/slices/movielistSlice";
export const Movie = ({ movie, id, option, combatants, rankedMovies, pickedStatus }) => {
  const dispatch = useDispatch();

  //use option = A to determine if 2nd function should be fire during onClick
  // onclick will update status of encounters #
  const updateEncounter = () => {
    console.log('updating encounter' )
    if (option == "A") {
      console.log('updating encounter for picking a')
     console.log('pickedStatus:' + pickedStatus)
     pickedStatus = true;
     console.log('pickedStatus:' + pickedStatus)
     
    }


  }
  return (
    <div>
      <h2>Title: {movie.title}</h2>
      <h3>Rank:{movie.rank}</h3>
      <h4>id: {id}</h4>
      <button onClick={
        
        () => (dispatch(changeRank({id: id, option: option, combatants: combatants, rankedMovies: rankedMovies})), updateEncounter()) }>ChangeRank</button>
    </div>
  );
};

import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../slices/movielistSlice";

export const Movie = ({ item, id, option, combatants, rankedItems }) => {
  const dispatch = useDispatch();

  function updateRank() {
    dispatch(
      changeRank({
        id: id,
        option: option,
        combatants: combatants,
        rankedItems: rankedItems,
      })
    );
  }

  //function combines
  //keeping to demonstrate how to combine dispatches for future uses
  function combinedUpdater() {
    updateRank();
  }

  return (
    <div>
      <h2>Title: {item.title}</h2>
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

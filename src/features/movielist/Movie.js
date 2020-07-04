import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../app/slices/movielistSlice";

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
  function combinedUpdater() {
    updateRank();
  }

  return (
    <div>
      <Card>
        <h2>Title: {item.title}</h2>
        <button
          onClick={
            combinedUpdater
            //,() => ( dispatch(changeRank({id: id, option: option, combatants: combatants, rankedMovies: rankedMovies}))    )
          }
        >
          ChangeRank
        </button>
      </Card>
    </div>
  );
};

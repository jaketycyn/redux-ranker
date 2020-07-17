import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../slices/movielistSlice";
import ItemGridCard from "../../display/components/ItemGridCard";

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

// add in later once we get the hookup to the api
//<ItemGridCard title={item.title} backImg={item.poster_path} />

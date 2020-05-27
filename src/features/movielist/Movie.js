import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../app/slices/movielistSlice";
export const Movie = ({ movie, id }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>title: {movie.title}</h2>
      <h3>rank:{movie.rank}</h3>
      <h4>id: {id}</h4>
      <button onClick={() => dispatch(changeRank(id))}>ChangeRank</button>
    </div>
  );
};

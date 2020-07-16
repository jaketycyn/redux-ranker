import React from "react";

const ItemGridCard = ({ title, backImg }) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + backImg} />
    </div>
  );
};

export default ItemGridCard;

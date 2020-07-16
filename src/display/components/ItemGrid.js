import React from "react";
import ItemGridCard from "./ItemGridCard";

//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      {items.map((item) => (
        <div>
          <ItemGridCard title={item.title} backImg={item.poster_path} />
        </div>
      ))}
    </section>
  );
};

export default ItemGrid;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//move /reorganize slices and app folder or this movielist folder to a more appropriate area
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
  const A = 'A' 
  const B = 'B'

  const [encounter, setEncounter] = useState(0);
  const [pickedStatus, setPickedStatus] = useState(null);
  const [ongoing, setOngoing] = useState(true);

  const unrankedMovies = movies.filter((movie) => movie.rank == 0);
   // console.log("unranked movies array:", unrankedMovies);
  const rankedMovies = movies.filter((movie) => movie.rank >= 1);
  // console.log("ranked movies array:", rankedMovies);
  const moviesSortedByRank = rankedMovies
  .slice()
  // false = reversed order ; lowest # is highest rank
  .sort(sort_by("rank", false, parseInt));

  const nextChallenger = Math.round(moviesSortedByRank.length / 2) ;
  const unrankedChallenger = unrankedMovies.slice(0, 1)
  //console.log("unranked challenger:" + JSON.stringify(unrankedChallenger, undefined, 2))
  const rankedIncumbent = moviesSortedByRank.slice(nextChallenger, nextChallenger + 1)
  const combatants = unrankedChallenger.concat(rankedIncumbent)

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  //
  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;

//unranked matchup display 2 unranked movies - after one is selected, both get assigned ranks
    if (rankedMovies.length === 0) {
     
      //create matchup variable that takes the # of indv. items from slice state and creates an object with them.
      //this object will be passed down as a prop to action.prototype to be used to look up from main state
      // an indiv. matchup variable will be created for each 'case' / if statement

      const unRankedMatchup = unrankedMovies.slice(0,2)
      console.log(unRankedMatchup)
      return (
        <div>
          <div> 
          {unRankedMatchup
            .slice(0, 1)
            .map((movie) => <Movie key={movie.id} movie={movie} id={movie.id} option={A} combatants={unRankedMatchup}/>)}
          </div>
          <div>
          {unRankedMatchup
            .slice(1, 2)
            .map((movie) => <Movie key={movie.id} movie={movie} id={movie.id} option={B} combatants={unRankedMatchup}/>)}
          </div>
        </div>
      )} 
      
// unranked vs ranked matchup      
      else if (unrankedMovies.length >= 1 && rankedMovies.length >= 1) {
     
      

     
     

//need to call af function below in movie that changes the status of unranked challenger or does stuff based off that.
// use index of the arrays to move to the next if else scenario 
// double function firing within Movie component based upon option = A to do. 
if (encounter === 0) {
        return (
          <div> 
            <div>
              {unrankedChallenger.map((movie) => (
                <Movie key={movie.id} movie={movie} id={movie.id} option={A} combatants={combatants} rankedMovies={moviesSortedByRank} pickedStatus={pickedStatus}/>
              ))}
            </div>
            <div>
              {rankedIncumbent
                .map((movie) => (
                  <Movie key={movie.id} movie={movie} id={movie.id} option={B} combatants={combatants} rankedMovies={moviesSortedByRank} pickedStatus={pickedStatus}/>
                ))}
            </div>
          </div>
        );
       }
       else if (encounter !== 0 && pickedStatus === true) {
        //true denotes Option A Incubant was picked, but more ranking needs to occur
        return (
          <div> 
            <div>
              {unrankedChallenger.map((movie) => (
                <Movie key={movie.id} movie={movie} id={movie.id} option={A} combatants={combatants} rankedMovies={moviesSortedByRank}/>
              ))}
            </div>
            <div>
              {rankedIncumbent
                .map((movie) => (
                  <Movie key={movie.id} movie={movie} id={movie.id} option={B} combatants={combatants} rankedMovies={moviesSortedByRank}/>
                ))}
            </div>
          </div>
        );
       }
    } else {
      //no unranked movies left
      return (
        <p>No unranked movies. Feel free to look through your sorted list </p>
      );
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

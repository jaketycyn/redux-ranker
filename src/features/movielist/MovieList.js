import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


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
  //
  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;

    const unrankedMovies = movies.filter((movie) => movie.rank == 0);
    const rankedMovies = movies.filter((movie) => movie.rank >= 1);
    // console.log("ranked movies array:", rankedMovies);
    // console.log("unranked movies array:", unrankedMovies);

    
    //show 2 unranked movies until 1 movie is ranked. THis ranked movie becomes basis of comparison for future movies.
//unranked matchup
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
     
      const moviesSortedByRank = rankedMovies
        .slice()
        // false = reversed order 
        .sort(sort_by("rank", false, parseInt));

      //Should work for now, but might need to be reconfigured later.
      //KEEP AN EYE ON THIS!
      const encounter = 0;
      const pickedStatus = null;
      const nextChallenger = Math.round(moviesSortedByRank.length / 2) ;
      const unrankedChallenger = unrankedMovies.slice(0, 1)
      const rankedIncumbent = moviesSortedByRank.slice(nextChallenger, nextChallenger + 1)
      

      //console.log("new combatants:" + JSON.stringify(combatants, undefined, 2))
      console.log("unranked challenger:" + JSON.stringify(unrankedChallenger, undefined, 2))
      // Method for getting around object is not extensive error
      // https://stackoverflow.com/questions/45798885/object-is-not-extensible-error-when-creating-new-attribute-for-array-of-objects
    
console.log("unranked challenger:" + JSON.stringify(unrankedChallenger, undefined, 2))


const combatants = unrankedChallenger .concat(rankedIncumbent)
//need to call af function below in movie that changes the status of unranked challenger or does stuff based off that.
// use index of the arrays to move to the next if else scenario 
// double function firing within Movie component based upon option = A to do. 
if (encounter == 0) {
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
       else if (encounter !== 0) {
        
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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  movielistSelector,
} from "../../redux/slices/movielistSlice";
import { Movie } from "./Movie";
import styled from "styled-components";

const UnRankedWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 6% 47% 47%;
  align-items: center;
  justify-items: center;
  padding-bottom: 2em;
  height: 100vh;
  color: #e9ebea;
`;

const StyledH1 = styled.h1`
  color: #e9ebea;
`;

const CombatantOneWrapper = styled.div`
  display: grid;
  grid-row: 2;
  /* background-color: darkgoldenrod; */
  margin: 2em;
`;
const CombatantTwoWrapper = styled.div`
  display: grid;
  grid-row: 3;
  /* background-color: darkblue; */
  margin: 2em;
`;

const EncombantWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 6% 47% 47%;
  /* background-color: pink; */
  align-items: center;
  justify-items: center;
  padding-bottom: 2em;
  height: 100vh;
  color: #e9ebea;
`;

const RenderMoviesDiv = styled.div`
  height: 100vh;
`;

const StyledFinishedText = styled.div`
  margin-top: 25%;
  margin-left: 25%;
  margin-right: 25%;
  position: absolute;
  text-align: center;
  align-items: center;
  justify-items: center;
  padding-bottom: 2em;
  color: #e9ebea;
`;

const MovieList = () => {
  const dispatch = useDispatch();
  const { loading, hasErrors, movies } = useSelector(movielistSelector);
  //console.log(JSON.stringify(movies, 2, undefined));
  // useEffect(() => {
  //   dispatch(fetchMovies());
  // }, [dispatch]);
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
  const A = "A";
  const B = "B";

  //movies pulls from the Redux state list that comprises of all movies
  const unrankedItems = movies.filter((item) => item.rank === 0);
  const rankedItems = movies.filter((item) => item.rank >= 1);
  const rankSortedItems = rankedItems
    .slice()
    // false = reversed order ; lowest # is highest rank
    .sort(sort_by("rank", false, parseInt));
  console.log("ranked sorted items:");
  console.log(rankSortedItems);
  const nextChallengerIndex = Math.floor(rankSortedItems.length / 2);

  const unrankedCombatant = unrankedItems.slice(0, 1);

  //these are deprecated variables for early checks/potential ways of using props to disperse information
  const rankedIncumbent = rankSortedItems.slice(
    nextChallengerIndex,
    nextChallengerIndex + 1
  );
  const combatants = unrankedCombatant.concat(rankedIncumbent);

  const activeItem = unrankedItems.filter(
    (item) => item.active === "won" || item.active === "lost"
  );

  //

  const renderMovies = () => {
    if (loading) return <p>Loading movies...</p>;
    if (hasErrors) return <p>Unable to display movies</p>;

    //unranked matchup display 2 unranked movies - after one is selected, both get assigned ranks

    if (rankedItems.length === 0) {
      const unRankedMatchup = unrankedItems.slice(0, 2);
      console.log("Phase 1: Unranked vs Unranked");
      return (
        <UnRankedWrapper name="UnRankedWrapper">
          <styledH1>Which is better?</styledH1>
          <CombatantOneWrapper name="CombatantOneWrapper">
            {unRankedMatchup.slice(0, 1).map((item) => (
              <Movie
                key={item.id}
                item={item}
                id={item.id}
                option={A}
                combatants={unRankedMatchup}
              />
            ))}
          </CombatantOneWrapper>
          <CombatantTwoWrapper name="CombatantTwoWrapper">
            {unRankedMatchup.slice(1, 2).map((item) => (
              <Movie
                key={item.id}
                item={item}
                id={item.id}
                option={B}
                combatants={unRankedMatchup}
              />
            ))}
          </CombatantTwoWrapper>
        </UnRankedWrapper>
      );
    }
    //As soon as an item has any rank the intial ranking will be done in the 'Unranked' vs 'Ranked' matchup.
    else if (rankedItems.length >= 1) {
      //dont know why this really exists - investigate later
      if (activeItem.length === 1) {
        // const activeRankedMovieBotBoundIndex = rankSortedItems.findIndex(
        //   (movies) => movies.rank === activeItem[0].botBound
        // );
        // ! winners bracket
        // .active denotes the current item being ranked's status
        // when .active is removed it'll no longer going through ranking as its rank is set
        if (activeItem[0].active === "won") {
          console.log("Phase 3.1: ChallengerRanked(Won) vs Ranked");

          const botBoundIndex = rankSortedItems.findIndex(
            (item) => item.rank === activeItem[0].botBound
          );

          console.log("botBoundIndex");
          console.log(botBoundIndex);

          if (activeItem[0].topBound) {
            const topBoundIndex = rankSortedItems.findIndex(
              (item) => item.rank === activeItem[0].topBound
            );

            const newRankedMoviesList = rankSortedItems.slice(
              topBoundIndex + 1,
              botBoundIndex
            );

            console.log("newRankedMoviesList");
            console.log(newRankedMoviesList);

            const nextRankedIncumbentIndex = Math.round(
              newRankedMoviesList.length / 2
            );

            console.log("nextRankedIncumbentIndex");
            console.log(nextRankedIncumbentIndex);

            const nextRankedIncumbent = newRankedMoviesList.slice(
              nextRankedIncumbentIndex - 1,
              nextRankedIncumbentIndex
            );
            console.log("nextRankedIncumbent");
            console.log(nextRankedIncumbent);

            const updatedCombatants = activeItem.concat(nextRankedIncumbent);

            console.log("updatedCombatants");
            console.log(updatedCombatants);

            return (
              <EncombantWrapper>
                <styledH1>Which is better?</styledH1>
                <CombatantOneWrapper name="CombatantOneWrapper">
                  {activeItem.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      active={item.active}
                      option={A}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantOneWrapper>
                <CombatantTwoWrapper name="CombatantTwoWrapper">
                  {nextRankedIncumbent.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      option={B}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantTwoWrapper>
              </EncombantWrapper>
            );
          }

          const newRankedMoviesList = rankSortedItems.slice(
            0,
            botBoundIndex + 1
          );

          console.log("newRankedMoviesList");
          console.log(newRankedMoviesList);

          const nextRankedIncumbentIndex = Math.round(
            newRankedMoviesList.length / 2
          );

          console.log("nextRankedIncumbentIndex");
          console.log(nextRankedIncumbentIndex);

          const nextRankedIncumbent = newRankedMoviesList.slice(
            nextRankedIncumbentIndex - 1,
            nextRankedIncumbentIndex
          );
          console.log("nextRankedIncumbent");
          console.log(nextRankedIncumbent);

          const updatedCombatants = activeItem.concat(nextRankedIncumbent);

          console.log("updatedCombatants");
          console.log(updatedCombatants);

          return (
            <EncombantWrapper>
              <styledH1>Which is better?</styledH1>
              <CombatantOneWrapper name="CombatantOneWrapper">
                {activeItem.map((item) => (
                  <Movie
                    key={item.id}
                    item={item}
                    id={item.id}
                    active={item.active}
                    option={A}
                    combatants={updatedCombatants}
                    rankedItems={newRankedMoviesList}
                    totalRankedItems={rankSortedItems}
                  />
                ))}
              </CombatantOneWrapper>
              <CombatantTwoWrapper name="CombatantTwoWrapper">
                {nextRankedIncumbent.map((item) => (
                  <Movie
                    key={item.id}
                    item={item}
                    id={item.id}
                    option={B}
                    combatants={updatedCombatants}
                    rankedItems={newRankedMoviesList}
                    totalRankedItems={rankSortedItems}
                  />
                ))}
              </CombatantTwoWrapper>
            </EncombantWrapper>
          );
        }

        // ! losers bracket
        else if (activeItem[0].active === "lost") {
          console.log("Phase 3.2: ChallengerRanked(Lost) vs Ranked");

          const topBoundIndex = rankSortedItems.findIndex(
            (item) => item.rank === activeItem[0].topBound
          );

          console.log("topBoundIndex");
          console.log(topBoundIndex);

          if (activeItem[0].botBound) {
            const botBoundIndex = rankSortedItems.findIndex(
              (item) => item.rank === activeItem[0].botBound
            );

            console.log("botBoundIndex");
            console.log(botBoundIndex);

            const newRankedMoviesList = rankSortedItems.slice(
              topBoundIndex + 1,
              botBoundIndex
            );

            console.log("newRankedMoviesList");
            console.log(newRankedMoviesList);

            const nextRankedIncumbentIndex = Math.floor(
              newRankedMoviesList.length / 2
            );
            console.log("nextRankedIncumbentIndex");
            console.log(nextRankedIncumbentIndex);

            if (
              nextRankedIncumbentIndex === 0 ||
              nextRankedIncumbentIndex === 1
            ) {
              let nextRankedIncumbent = newRankedMoviesList.slice(
                nextRankedIncumbentIndex,
                nextRankedIncumbentIndex + 1
              );
              console.log("nextRankedIncumbent");
              console.log(nextRankedIncumbent);

              const updatedCombatants = activeItem.concat(nextRankedIncumbent);

              console.log("updatedCombatants");
              console.log(updatedCombatants);

              return (
                <EncombantWrapper>
                  <StyledH1>Which is better?</StyledH1>
                  <CombatantOneWrapper name="CombatantOneWrapper">
                    {activeItem.map((item) => (
                      <Movie
                        key={item.id}
                        item={item}
                        id={item.id}
                        active={item.active}
                        option={A}
                        combatants={updatedCombatants}
                        rankedItems={newRankedMoviesList}
                        totalRankedItems={rankSortedItems}
                      />
                    ))}
                  </CombatantOneWrapper>
                  <CombatantTwoWrapper name="CombatantTwoWrapper">
                    {nextRankedIncumbent.map((item) => (
                      <Movie
                        key={item.id}
                        item={item}
                        id={item.id}
                        option={B}
                        combatants={updatedCombatants}
                        rankedItems={newRankedMoviesList}
                        totalRankedItems={rankSortedItems}
                      />
                    ))}
                  </CombatantTwoWrapper>
                </EncombantWrapper>
              );
            } else {
              let nextRankedIncumbent = newRankedMoviesList.slice(
                nextRankedIncumbentIndex + 1,
                nextRankedIncumbentIndex + 2
              );
              console.log("nextRankedIncumbent");
              console.log(nextRankedIncumbent);

              const updatedCombatants = activeItem.concat(nextRankedIncumbent);

              console.log("updatedCombatants");
              console.log(updatedCombatants);

              return (
                <EncombantWrapper>
                  <StyledH1>Which is better?</StyledH1>
                  <CombatantOneWrapper name="CombatantOneWrapper">
                    {activeItem.map((item) => (
                      <Movie
                        key={item.id}
                        item={item}
                        id={item.id}
                        active={item.active}
                        option={A}
                        combatants={updatedCombatants}
                        rankedItems={newRankedMoviesList}
                        totalRankedItems={rankSortedItems}
                      />
                    ))}
                  </CombatantOneWrapper>
                  <CombatantTwoWrapper name="CombatantTwoWrapper">
                    {nextRankedIncumbent.map((item) => (
                      <Movie
                        key={item.id}
                        item={item}
                        id={item.id}
                        option={B}
                        combatants={updatedCombatants}
                        rankedItems={newRankedMoviesList}
                        totalRankedItems={rankSortedItems}
                      />
                    ))}
                  </CombatantTwoWrapper>
                </EncombantWrapper>
              );
            }
          }

          const newRankedMoviesList = rankSortedItems.slice(
            topBoundIndex + 1,
            rankSortedItems.length
          );

          console.log("newRankedMoviesList");
          console.log(newRankedMoviesList);

          const nextRankedIncumbentIndex = Math.floor(
            newRankedMoviesList.length / 2
          );
          console.log("nextRankedIncumbentIndex");
          console.log(nextRankedIncumbentIndex);

          if (
            nextRankedIncumbentIndex === 0 ||
            nextRankedIncumbentIndex === 1
          ) {
            let nextRankedIncumbent = newRankedMoviesList.slice(
              nextRankedIncumbentIndex,
              nextRankedIncumbentIndex + 1
            );
            console.log("nextRankedIncumbent");
            console.log(nextRankedIncumbent);

            const updatedCombatants = activeItem.concat(nextRankedIncumbent);

            console.log("updatedCombatants");
            console.log(updatedCombatants);

            return (
              <EncombantWrapper>
                <StyledH1>Which is better?</StyledH1>
                <CombatantOneWrapper name="CombatantOneWrapper">
                  {activeItem.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      active={item.active}
                      option={A}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantOneWrapper>
                <CombatantTwoWrapper name="CombatantTwoWrapper">
                  {nextRankedIncumbent.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      option={B}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantTwoWrapper>
              </EncombantWrapper>
            );
          } else {
            let nextRankedIncumbent = newRankedMoviesList.slice(
              nextRankedIncumbentIndex + 1,
              nextRankedIncumbentIndex + 2
            );
            console.log("nextRankedIncumbent");
            console.log(nextRankedIncumbent);

            const updatedCombatants = activeItem.concat(nextRankedIncumbent);

            console.log("updatedCombatants");
            console.log(updatedCombatants);

            return (
              <EncombantWrapper>
                <StyledH1>Which is better?</StyledH1>
                <CombatantOneWrapper name="CombatantOneWrapper">
                  {activeItem.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      active={item.active}
                      option={A}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantOneWrapper>
                <CombatantTwoWrapper name="CombatantTwoWrapper">
                  {nextRankedIncumbent.map((item) => (
                    <Movie
                      key={item.id}
                      item={item}
                      id={item.id}
                      option={B}
                      combatants={updatedCombatants}
                      rankedItems={newRankedMoviesList}
                      totalRankedItems={rankSortedItems}
                    />
                  ))}
                </CombatantTwoWrapper>
              </EncombantWrapper>
            );
          }
        }
      } else if (unrankedItems.length >= 1) {
        console.log("Phase 2: Unranked vs Ranked");
        return (
          <EncombantWrapper>
            <styledH1>Which is better?</styledH1>
            <CombatantOneWrapper name="CombatantOneWrapper">
              {unrankedCombatant.map((item) => (
                <Movie
                  key={item.id}
                  item={item}
                  id={item.id}
                  active={item.active}
                  option={A}
                  combatants={combatants}
                  rankedItems={rankSortedItems}
                  totalRankedItems={rankSortedItems}
                />
              ))}
            </CombatantOneWrapper>
            <CombatantTwoWrapper name="CombatantTwoWrapper">
              {rankedIncumbent.map((item) => (
                <Movie
                  key={item.id}
                  item={item}
                  id={item.id}
                  option={B}
                  combatants={combatants}
                  rankedItems={rankSortedItems}
                  totalRankedItems={rankSortedItems}
                />
              ))}
            </CombatantTwoWrapper>
          </EncombantWrapper>
        );
      } else {
        console.log("Phase 6: RANKING COMPLETE");
        return (
          <EncombantWrapper>
            <StyledFinishedText>
              <p>
                All movies ranked! Click <b>'Add'</b> below to add more items to
                rank or <b>'Review'</b> to see your rankings.
              </p>
            </StyledFinishedText>
          </EncombantWrapper>
        );
      }
    }
  };
  return <RenderMoviesDiv>{renderMovies()}</RenderMoviesDiv>;
};

export default MovieList;

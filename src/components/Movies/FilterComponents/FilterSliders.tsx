import { Slider } from "@mui/material";
import { useContext } from "react";
import { FilterContext } from "../Context/FilterContext";

export const FilterSliders = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    runtime,
    handleRuntimeChange,
    userScore,
    handleUserScoreChange,
    userVote,
    handleUserVoteChange,
  } = filterState;

  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <>
      <div>
        <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
          <h2 className=" font-light text-grey-500 text-sm">User Score</h2>
          <Slider
            aria-label="User Score"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            value={userScore}
            onChange={handleUserScoreChange}
          />
        </section>
        <hr />
        <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
          <h2 className=" font-light text-grey-500 text-sm">
            Minimum User Votes
          </h2>
          <Slider
            aria-label="Minimum User Votes"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={50}
            marks
            min={0}
            max={500}
            value={typeof userVote === "number" ? userVote : 0}
            onChange={handleUserVoteChange}
          />
        </section>
        <hr />
        <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
          <h2 className=" font-light text-grey-500 text-sm">Runtime</h2>
          <Slider
            aria-label="Runtime"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={15}
            marks
            min={0}
            max={400}
            value={runtime}
            onChange={handleRuntimeChange}
          />
        </section>
      </div>
    </>
  );
};

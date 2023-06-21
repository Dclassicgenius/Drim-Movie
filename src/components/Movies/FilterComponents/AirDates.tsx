import { useContext } from "react";
import classNames from "classnames";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { DateSelector } from "./DateSelector";
import { FilterContext } from "../Context/FilterContext";

export const AirDates = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("AirDates must be used within a FilterContext.Provider");
  }

  const {
    mediaType,
    firstAirDate,
    handleFirstAirDateChange,
    releasesAll,
    handleReleaseAllChange,
    releaseDateStart,
    releaseDateEnd,
    handleReleaseDateStart,
    handleReleaseDateEnd,
  } = filterState;
  return (
    <section
      className={classNames(
        mediaType === "tv"
          ? "block [@media(min-width:600px)]:px-4 pt-3 px-10"
          : "hidden"
      )}
    >
      <h2 className=" font-light text-grey-500 text-sm">Air Dates</h2>
      <Box>
        <FormControlLabel
          control={
            <Checkbox checked={releasesAll} onChange={handleReleaseAllChange} />
          }
          label="Search all episodes?"
        />
      </Box>
      <div className={classNames(releasesAll ? "hidden" : "block ")}>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={firstAirDate}
                onChange={handleFirstAirDateChange}
              />
            }
            label="Search first air date?"
          />
        </Box>
      </div>
      <DateSelector
        releaseDateStart={releaseDateStart}
        releaseDateEnd={releaseDateEnd}
        handleReleaseDateStart={handleReleaseDateStart}
        handleReleaseDateEnd={handleReleaseDateEnd}
      />
    </section>
  );
};

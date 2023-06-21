import { useContext, useState } from "react";
import classNames from "classnames";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FilterContext } from "../Context/FilterContext";

const sortParameters = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z" },
  { value: "title.desc", label: "Title (Z-A)" },
];

export const SortFilter = () => {
  const [isDivOpen, setIsDivOpen] = useState(false);

  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const { sortValue, handleSortChange } = filterState;

  return (
    <>
      <section className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 rounded-lg [@media(min-width:600px)]:px-0 px-10 ">
        <div>
          <button
            className="px-3 text-left py-3 w-full font-bold"
            onClick={() => {
              setIsDivOpen(!isDivOpen);
            }}
          >
            Sort
          </button>
          <div
            className={classNames(isDivOpen ? "block" : "hidden", "px-3 pb-3")}
          >
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortValue}
                label="Sort"
                onChange={handleSortChange}
              >
                {sortParameters.map((sort) => (
                  <MenuItem key={sort.value} value={sort.value}>
                    {sort.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </section>
    </>
  );
};

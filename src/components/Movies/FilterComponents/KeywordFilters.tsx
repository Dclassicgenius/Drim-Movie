import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { FilterContext } from "../Context/FilterContext";

export const KeywordFilters = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    selectedKeywords,
    keywords,
    searchQuery,
    handleSearchInputChange,
    handleKeywordSelect,
  } = filterState;

  return (
    <section className="[@media(min-width:600px)]:px-4 p-4 px-10">
      <h2 className=" font-light text-grey-500 text-sm pb-2">Keywords</h2>

      <Autocomplete
        multiple
        id="tags-outlined"
        options={keywords}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={selectedKeywords}
        onChange={handleKeywordSelect}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            option.name.toLowerCase().includes(params.inputValue.toLowerCase())
          );
          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Keywords"
            placeholder="filter by keywords"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        )}
      />
    </section>
  );
};

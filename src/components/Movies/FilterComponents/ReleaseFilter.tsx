import { useContext } from "react";
import classNames from "classnames";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  Box,
} from "@mui/material";
import { CountrySelect } from "./Country/CountrySelect";
import { DateSelector } from "./DateSelector";
import { FilterContext } from "../Context/FilterContext";

const releases = [
  { value: 1, label: "Premiere" },
  { value: 2, label: "Theatrical (limited)" },
  { value: 3, label: "Theatrical" },
  { value: 4, label: "Digital" },
  { value: 5, label: "Physical" },
  { value: 6, label: "TV" },
];

export const ReleaseFilter = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    releaseDateStart,
    releaseDateEnd,
    handleReleaseDateStart,
    handleReleaseDateEnd,
    countriesAll,
    handleCountriesAllChange,
    selectCountry,
    handleSelectCountryChange,
    releasesAll,
    releasesTypes,
    handleReleaseAllChange,
    handleReleaseChange,
    mediaType,
  } = filterState;

  return (
    <section
      className={classNames(
        mediaType === "movie"
          ? "block [@media(min-width:600px)]:px-4 pt-3 px-10"
          : "hidden"
      )}
    >
      <h2 className=" font-light text-grey-500 text-sm">Release Dates</h2>

      <Box>
        <FormControlLabel
          control={
            <Checkbox checked={releasesAll} onChange={handleReleaseAllChange} />
          }
          label="Search all releases"
        />
      </Box>

      <div className={classNames(releasesAll ? "hidden" : "block")}>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={countriesAll}
                onChange={handleCountriesAllChange}
              />
            }
            label="Search all countries"
          />
        </Box>
        <div className={classNames(countriesAll ? "hidden" : "block")}>
          <Box sx={{ py: 0.75 }}>
            <CountrySelect
              handleSelectCountryChange={handleSelectCountryChange}
              selectCountry={selectCountry}
            />
          </Box>
        </div>
        <Box sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {releases.map((release) => (
                <FormControlLabel
                  key={release.value}
                  control={
                    <Checkbox
                      checked={releasesTypes.includes(release.value)}
                      onChange={handleReleaseChange}
                      name={release.label}
                      value={release.value}
                    />
                  }
                  label={release.label}
                />
              ))}
            </FormGroup>
          </FormControl>
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

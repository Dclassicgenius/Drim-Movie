import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import {
  InputLabel,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Select,
  Slider,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useGenres } from "../../../hooks/FilterHooks/useGenres";
import { useCertifications } from "../../../hooks/FilterHooks/useCertifications";
import { FilterChips } from "../../utility/FilterChips/FilterChips";
import { Keyword } from "../../../types";
import { CountrySelect } from "../../utility/Country/CountrySelect";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { CountryType } from "../../utility/Country/countries";
import { DateSelector } from "../../utility/DateSelector";

type MovieFiltersProps = {
  sortValue: string;
  handleSortChange: (event: SelectChangeEvent) => void;
  runtime: number | number[];
  handleRuntimeChange: (event: Event, newValue: number | number[]) => any;
  userScore: number | number[];
  handleUserScoreChange: (event: Event, newValue: number | number[]) => any;
  userVote: number | string | Array<number | string>;
  handleUserVoteChange: (event: Event, newValue: number | number[]) => any;
  handleGenreChipClick: (chip: string) => void;
  selectedGenreChips: string[];
  handleCertificationChipClick: (chip: string) => void;
  selectedCertificationChips: string[];
  isChipSelected: boolean;
  availabilityFilter: string[];
  checkedAvailabilityAll: boolean;
  handleAvailabilityAllChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAvailabiltyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSearchDisabled: boolean;
  handleButtonClick: () => void;
  selectedKeywords: Keyword[];
  keywords: Keyword[];
  searchQuery: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeywordSelect: (event: React.ChangeEvent<{}>, value: Keyword[]) => void;
  releaseDateStart: Dayjs | null;
  releaseDateEnd: Dayjs | null;
  handleReleaseDateStart: (newValue: Dayjs | null) => void;
  handleReleaseDateEnd: (newValue: Dayjs | null) => void;
  countriesAll: boolean;
  handleCountriesAllChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectCountry: CountryType | null;
  handleSelectCountryChange: (
    event: ChangeEvent<{}>,
    newValue: CountryType | null
  ) => void;
  releaseAll: boolean;
  releasesTypes: number[];
  handleReleaseAllChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleReleaseChange: (event: ChangeEvent<HTMLInputElement>) => void;
  mediaType: "tv" | "movie";
  firstAirDate: boolean;
  handleFirstAirDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function MovieFilters({
  sortValue,
  handleSortChange,
  runtime,
  handleRuntimeChange,
  userScore,
  handleUserScoreChange,
  userVote,
  handleUserVoteChange,
  selectedGenreChips,
  handleGenreChipClick,
  selectedCertificationChips,
  handleCertificationChipClick,
  isChipSelected,
  availabilityFilter,
  handleAvailabiltyChange,
  checkedAvailabilityAll,
  handleAvailabilityAllChange,
  isSearchDisabled,
  handleButtonClick,
  selectedKeywords,
  keywords,
  searchQuery,
  handleSearchInputChange,
  handleKeywordSelect,
  releaseDateStart,
  releaseDateEnd,
  handleReleaseDateStart,
  handleReleaseDateEnd,
  countriesAll,
  handleCountriesAllChange,
  selectCountry,
  handleSelectCountryChange,
  releaseAll,
  releasesTypes,
  handleReleaseAllChange,
  handleReleaseChange,
  mediaType,
  firstAirDate,
  handleFirstAirDateChange,
}: MovieFiltersProps) {
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const movieGenres = useGenres("movie");
  const tvGenres = useGenres("tv");
  const { data: movieCertifications } = useCertifications("movie");
  const usMovieCertifications = (movieCertifications ?? {})["US"] || [];
  const { data: tvCertifications } = useCertifications("tv");
  const usTvCertifications = (tvCertifications ?? {})["US"] || [];

  const handleError = (error: DateValidationError, value: Dayjs | null) => {};

  const releases = [
    { value: 1, label: "Premiere" },
    { value: 2, label: "Theatrical (limited)" },
    { value: 3, label: "Theatrical" },
    { value: 4, label: "Digital" },
    { value: 5, label: "Physical" },
    { value: 6, label: "TV" },
  ];

  // const availabilities = ["Flatrate", "Free", "Ads", "Rent", "Buy"];

  const availabilities = [
    { value: "Flatrate", label: "Stream" },
    { value: "Free", label: "Free" },
    { value: "Ads", label: "Ads" },
    { value: "Rent", label: "Rent" },
    { value: "Buy", label: "Buy" },
  ];

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

  const toggleDiv = () => {
    setIsDivOpen(!isDivOpen);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <>
      <aside className=" pb-5 px-10 [@media(min-width:600px)]:px-5">
        <div className="mb-4">
          <section className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 rounded-lg [@media(min-width:600px)]:px-0 px-10 ">
            <div>
              <button
                className="px-3 text-left py-3 w-full font-bold"
                onClick={toggleDiv}
              >
                Sort
              </button>
              <div
                className={classNames(
                  isDivOpen ? "block" : "hidden",
                  "px-3 pb-3"
                )}
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

          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <button
              className="text-left w-full pb-2 font-bold px-12 [@media(min-width:600px)]:px-4 pt-4  "
              onClick={toggleFilter}
            >
              Filter
            </button>
            <hr />

            <div className={classNames(isFilterOpen ? "block" : "hidden")}>
              <section className="[@media(min-width:600px)]:px-4 py-3 px-10">
                <h2 className=" font-light text-grey-500 text-sm ">
                  Availabilities
                </h2>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedAvailabilityAll}
                        onChange={handleAvailabilityAllChange}
                      />
                    }
                    label="Search all availabilities"
                  />
                </Box>
                <div
                  className={classNames(
                    checkedAvailabilityAll ? "hidden" : "block"
                  )}
                >
                  <Box sx={{ display: "flex" }}>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        {availabilities.map((availability) => (
                          <FormControlLabel
                            key={availability.value}
                            control={
                              <Checkbox
                                checked={availabilityFilter.includes(
                                  availability.value.toLowerCase()
                                )}
                                value={availability.value.toLowerCase()}
                                onChange={handleAvailabiltyChange}
                              />
                            }
                            label={availability.label}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Box>
                </div>
              </section>
              <hr />
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
                      <Checkbox
                        checked={releaseAll}
                        onChange={handleReleaseAllChange}
                      />
                    }
                    label="Search all episodes?"
                  />
                </Box>
                <div className={classNames(releaseAll ? "hidden" : "block ")}>
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
              <hr
                className={classNames(mediaType === "tv" ? "block" : "hidden")}
              />
              <section
                className={classNames(
                  mediaType === "movie"
                    ? "block [@media(min-width:600px)]:px-4 pt-3 px-10"
                    : "hidden"
                )}
              >
                <h2 className=" font-light text-grey-500 text-sm">
                  Release Dates
                </h2>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={releaseAll}
                        onChange={handleReleaseAllChange}
                      />
                    }
                    label="Search all releases"
                  />
                </Box>

                <div className={classNames(releaseAll ? "hidden" : "block")}>
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
                  <div
                    className={classNames(countriesAll ? "hidden" : "block")}
                  >
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
              <hr
                className={classNames(
                  mediaType === "movie" ? "block" : "hidden"
                )}
              />
              <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
                <h2 className=" font-light text-grey-500 text-sm">Genres</h2>

                <FilterChips
                  selectedChips={selectedGenreChips}
                  handleChipClick={handleGenreChipClick}
                  chips={mediaType === "tv" ? tvGenres.data : movieGenres.data}
                />
              </section>
              <hr />
              <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
                <h2 className=" font-light text-grey-500 text-sm">
                  Certifications
                </h2>
                <FilterChips
                  selectedChips={selectedCertificationChips}
                  handleChipClick={handleCertificationChipClick}
                  chips={
                    mediaType === "tv"
                      ? usTvCertifications
                      : usMovieCertifications
                  }
                  disableChips={(mediaType === "tv"
                    ? usTvCertifications
                    : usMovieCertifications
                  ).map(
                    (chip) =>
                      isChipSelected &&
                      !selectedCertificationChips.includes(chip.certification)
                  )}
                />
              </section>
              <hr />
              <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
                <h2 className=" font-light text-grey-500 text-sm">
                  User Score
                </h2>
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
              <hr />
              <section className="[@media(min-width:600px)]:px-4 p-4 px-10">
                <h2 className=" font-light text-grey-500 text-sm pb-2">
                  Keywords
                </h2>

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
                      option.name
                        .toLowerCase()
                        .includes(params.inputValue.toLowerCase())
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
            </div>
          </div>
        </div>

        {/* <button
          disabled={isSearchDisabled}
          onClick={handleButtonClick}
          className={classNames(
            "rounded-full",
            "py-2",
            "px-10",
            "bg-sky-500",
            "block",
            "w-full",
            {
              "disabled:opacity-50": isSearchDisabled,
              "disabled:cursor-not-allowed": isSearchDisabled,
              "disabled:border-gray-400": isSearchDisabled,
            }
          )}
        >
          Search
        </button> */}
      </aside>
    </>
  );
}

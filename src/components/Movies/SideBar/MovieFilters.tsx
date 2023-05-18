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
} from "@mui/material";
import CountrySelect from "../../utility/Country/CountrySelect";
import { useGenres } from "../../../hooks/FilterHooks/useGenres";
import { useCertifications } from "../../../hooks/FilterHooks/useCertifications";
import { FilterChips } from "../../utility/FilterChips/FilterChips";

type MovieFiltersProps = {
  sortValue: string;
  handleSortChange: (event: SelectChangeEvent) => void;
  runtime: number | string | Array<number | string>;
  handleRuntimeChange: (event: Event, newValue: number | number[]) => any;
  userScore: number | string | Array<number | string>;
  handleUserScoreChange: (event: Event, newValue: number | number[]) => any;
  userVote: number | string | Array<number | string>;
  handleUserVoteChange: (event: Event, newValue: number | number[]) => any;
  handleGenreChipClick: (chip: string) => void;
  selectedGenreChips: string[];
  handleCertificationChipClick: (chip: string) => void;
  selectedCertificationChips: string[];
  availabilityFilter: string[];
  checkedAvailabilityAll: boolean;
  handleAvailabilityAllChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAvailabiltyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSearchDisabled: boolean;
  handleButtonClick: () => void;
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
  availabilityFilter,
  handleAvailabiltyChange,
  checkedAvailabilityAll,
  handleAvailabilityAllChange,
  isSearchDisabled,
  handleButtonClick,
}: MovieFiltersProps) {
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [releaseFilter, setReleaseFilter] = useState<number[]>([]);

  const [checkedReleaseAll, setCheckedReleaseAll] = useState(true);
  const [checkedCountriesAll, setCheckedCountriesAll] = useState(true);

  const genres = useGenres("movie");
  const { data: certifications } = useCertifications("movie");
  const usCertifications = (certifications ?? {})["US"] || [];
  const certificationNames = usCertifications.map(
    (certification) => certification.certification
  );

  const releases = [
    { value: 1, label: "Premiere" },
    { value: 2, label: "Theatrical (limited)" },
    { value: 3, label: "Theatrical" },
    { value: 4, label: "Digital" },
    { value: 5, label: "Physical" },
    { value: 6, label: "TV" },
  ];

  const availabilities = ["Stream", "Free", "Ads", "Rent", "Buy"];

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

  const handleReleaseAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedReleaseAll(event.target.checked);
  };
  const handleCountriesAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedCountriesAll(event.target.checked);
  };

  const handleReleaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const releaseValue = parseInt(event.target.value);
    const index = releaseFilter.indexOf(releaseValue);
    if (index === -1) {
      setReleaseFilter([...releaseFilter, releaseValue]);
    } else {
      setReleaseFilter(
        releaseFilter.filter((release) => release !== releaseValue)
      );
    }
  };
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
      <aside className=" p-5">
        <div className="mb-4">
          <section className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 rounded-lg">
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
              className="text-left w-full pb-2 font-bold px-4 pt-4  "
              onClick={toggleFilter}
            >
              Filter
            </button>
            <hr />

            <div className={classNames(isFilterOpen ? "block" : "hidden", "")}>
              <section className="px-4 pt-3">
                <h2 className=" font-light text-grey-500 text-sm">
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
                    label="Search all availabilities?"
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
                        {availabilities.map((item) => (
                          <FormControlLabel
                            key={item}
                            control={
                              <Checkbox
                                checked={availabilityFilter.includes(item)}
                                onChange={handleAvailabiltyChange}
                                name={item}
                                value={item.toLocaleLowerCase()}
                              />
                            }
                            label={item}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Box>
                </div>

                {/* <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedReleaseAll}
                        onChange={handleReleaseAllChange}
                      />
                    }
                    label="Search all releases"
                  />
                </Box> */}
                {/* <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCountriesAll}
                        onChange={handleCountriesAllChange}
                      />
                    }
                    label="Search all countries"
                  />
                </Box> */}

                {/* <div
                  className={classNames(
                    checkedCountriesAll ? "hidden" : "block"
                  )}
                >
                  <Box>
                    <CountrySelect />
                  </Box>
                </div>

                <div
                  className={classNames(checkedReleaseAll ? "hidden" : "block")}
                >
                  <Box sx={{ display: "flex" }}>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        {releases.map((release) => (
                          <FormControlLabel
                            key={release.value}
                            control={
                              <Checkbox
                                checked={releaseFilter.includes(release.value)}
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
                </div> */}
              </section>
              <section className="px-4 pt-3">
                <h2 className=" font-light text-grey-500 text-sm">Genres</h2>

                <FilterChips
                  selectedChips={selectedGenreChips}
                  handleChipClick={handleGenreChipClick}
                  chips={genres.data?.map((genre) => genre.name)}
                />
              </section>
              <hr />
              <section className="px-4 pt-3">
                <h2 className=" font-light text-grey-500 text-sm">
                  Certifications
                </h2>
                <FilterChips
                  selectedChips={selectedCertificationChips}
                  handleChipClick={handleCertificationChipClick}
                  chips={certificationNames}
                />
              </section>
              <hr />
              <section className="px-4 pt-3">
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
                  value={typeof userScore === "number" ? userScore : 0}
                  onChange={handleUserScoreChange}
                />
              </section>
              <hr />
              <section className="px-4 pt-3">
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
              <section className="px-4 pt-3">
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
                  value={typeof runtime === "number" ? runtime : 0}
                  onChange={handleRuntimeChange}
                />
              </section>
              <hr />
              <section className="p-4">
                <h2 className=" font-light text-grey-500 text-sm pb-2">
                  Keywords
                </h2>
                <input
                  type="text"
                  placeholder="Filter by keywords..."
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </section>
            </div>
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          className={`rounded-full py-2 px-10 bg-sky-500 block w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-400 ${
            isSearchDisabled
              ? "disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-400"
              : ""
          }`}
        >
          Search
        </button>
      </aside>
    </>
  );
}

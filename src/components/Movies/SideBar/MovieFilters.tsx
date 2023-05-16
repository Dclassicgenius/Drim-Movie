import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import { CountryType, countries } from "../../utility/Country/countries";
import {
  InputLabel,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Select,
  Slider,
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import CountrySelect from "../../utility/Country/CountrySelect";

export function MovieFilters() {
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortValue, setSortValue] = useState("Popularity Descending");
  const [releaseFilter, setReleaseFilter] = useState<string[]>([]);
  const [checkedReleaseAll, setCheckedReleaseAll] = useState(true);
  const [checkedCountriesAll, setCheckedCountriesAll] = useState(true);
  const [countryValue, setCountryValue] = useState<CountryType>();

  const releases = [
    "Premiere",
    "Theatrical (limited)",
    "Theatrical",
    "Digital",
    "Physical",
    "TV",
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const handleReleaseAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedReleaseAll(event.target.checked);
  };
  const handleCountriesAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedCountriesAll(event.target.checked);
  };

  const handleReleaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = releaseFilter.indexOf(event.target.value);
    if (index === -1) {
      setReleaseFilter([...releaseFilter, event.target.value]);
    } else {
      setReleaseFilter(
        releaseFilter.filter((release) => release !== event.target.value)
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
                    onChange={handleChange}
                  >
                    <MenuItem value={"Popularity Descending"}>
                      Popularity Descending
                    </MenuItem>
                    <MenuItem value={"Popularity Ascending"}>
                      Popularity Ascending
                    </MenuItem>
                    <MenuItem value={"Rating Descending"}>
                      Rating Descending
                    </MenuItem>
                    <MenuItem value={"Rating Ascending"}>
                      Rating Ascending
                    </MenuItem>
                    <MenuItem value={"Release Date Descending"}>
                      Release Date Descending
                    </MenuItem>
                    <MenuItem value={"Release Date Ascending"}>
                      Release Date Ascending
                    </MenuItem>
                    <MenuItem value={"Title (A-Z)"}>Title (A-Z)</MenuItem>
                    <MenuItem value={"Title (Z-A)"}>Title (Z-A)</MenuItem>
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
                        checked={checkedReleaseAll}
                        onChange={handleReleaseAllChange}
                      />
                    }
                    label="Search all releases"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCountriesAll}
                        onChange={handleCountriesAllChange}
                      />
                    }
                    label="Search all countries"
                  />
                </Box>

                <div
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
                        {releases.map((release, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={releaseFilter.includes(release)}
                                onChange={handleReleaseChange}
                                name={release}
                                value={release}
                              />
                            }
                            label={release}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Box>
                </div>
              </section>
              <section className="px-4 pt-3">
                <h2 className=" font-light text-grey-500 text-sm">Genres</h2>
                <ul className="flex flex-wrap justify-start list-none pt-3">
                  <li className="mr-2 mb-4 leading-6 whitespace-nowrap text-xs list-item  px-3 py-1 rounded-full border border-black cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none">
                    <p>Action</p>
                  </li>
                </ul>
              </section>
              <hr />
              <section className="px-4 pt-3">
                <h2 className=" font-light text-grey-500 text-sm">
                  Certifications
                </h2>
                <ul className="flex flex-wrap justify-start list-none pt-3">
                  <li className="mr-2 mb-4 leading-6 whitespace-nowrap text-xs list-item  px-3 py-1 rounded-full border border-black cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none">
                    <p>Action</p>
                  </li>
                </ul>
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
                />
              </section>
              <hr />
              <section className="p-4">
                <h2 className=" font-light text-grey-500 text-sm pb-2">
                  Keywords
                </h2>
                <input
                  type="text"
                  placeholder="Filter by keywords.."
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </section>
            </div>
          </div>
        </div>

        <button className="rounded-full py-2 px-10 bg-sky-500 block w-full">
          Search
        </button>
      </aside>
    </>
  );
}

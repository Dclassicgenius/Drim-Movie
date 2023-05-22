import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Keyword } from "../../../types";
import { MovieFilters } from "../SideBar/MovieFilters";
import { SelectChangeEvent } from "@mui/material/Select";
import { MovieCards } from "../MovieCards/MovieCards";
import { Box, Grid, debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../../../hooks/SearchHook/useSearchKeyword";
import { Movie, useMoviesAll } from "../../../hooks/MovieHooks/useMoviesAll";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { CountryType, countries } from "../../utility/Country/countries";

export function PopularMovies() {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [sortValue, setSortValue] = useState("popularity.desc");
  const [runtime, setRuntime] = useState<
    number | string | Array<number | string>
  >(0);
  const [userScore, setUserScore] = useState<
    number | string | Array<number | string>
  >(0);
  const [userVote, setUserVote] = useState<
    number | string | Array<number | string>
  >(0);
  const [selectedGenreChips, setSelectedGenreChips] = useState<string[]>([]);
  const [selectedCertificationChips, setSelectedCertificationChips] = useState<
    string[]
  >([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [checkedAvailabilityAll, setCheckedAvailabilityAll] = useState(true);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [releaseDateStart, setReleaseDateStart] = useState<string | null>("");
  const [releaseDateEnd, setReleaseDateEnd] = useState<string | null>(
    "2023-11-21"
  );

  const [selectCountry, setSelectCountry] = useState<CountryType | null>(
    countries.find((country) => country.code === "US") ?? null
  );

  const [releasesTypes, setReleasesTypes] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);

  const [countriesAll, setCountriesAll] = useState(true);
  const [releasesAll, setReleasesAll] = useState(true);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const genreFilters = selectedGenreChips.join(",").toLowerCase();
  const monetizationFilters = availabilityFilter.join("|").toLowerCase();

  const certificationFilter = selectedCertificationChips
    .map((cert) => `&certification=${cert}`)
    .join(",");

  const keywordFilter = selectedKeywords
    .map((word) => `&with_keywords=${word.id.toString()}`)
    .join("|");
  const selectedRegion = selectCountry?.code ?? null;
  const releaseTypeFilter = releasesTypes.join("|");

  useEffect(() => {
    if (
      sortValue !== "" ||
      (!checkedAvailabilityAll && availabilityFilter.length > 0) ||
      runtime !== 0 ||
      userScore !== 0 ||
      userVote !== 0 ||
      selectedGenreChips.length > 0 ||
      selectedCertificationChips.length > 0 ||
      availabilityFilter.length > 0 ||
      selectedKeywords.length > 0
    ) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  }, [
    sortValue,
    checkedAvailabilityAll,
    runtime,
    userScore,
    userVote,
    selectedGenreChips,
    selectedCertificationChips,
    availabilityFilter,
    selectedKeywords,
  ]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const handleRuntimeChange = (event: Event, newValue: number | number[]) => {
    setRuntime(newValue);
  };
  const handleUserScoreChange = (event: Event, newValue: number | number[]) => {
    setUserScore(newValue);
  };
  const handleUserVoteChange = (event: Event, newValue: number | number[]) => {
    setUserVote(newValue);
  };

  const { data: keywords = [] } = useQuery<Keyword[], Error>(
    ["keywords", searchQuery],
    () => fetchKeywords(searchQuery),
    { enabled: !!searchQuery }
  );

  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    debouncedSetSearchQuery(event.target.value);
  };

  const handleKeywordSelect = (
    event: React.ChangeEvent<{}>,
    value: Keyword[]
  ) => {
    setSelectedKeywords(value);
  };

  const handleGenreChipClick = (chip: string) => {
    setSelectedGenreChips((prevSelectedChips) => {
      const chipIndex = prevSelectedChips.indexOf(chip);
      if (chipIndex === -1) {
        return [...prevSelectedChips, chip];
      } else {
        return prevSelectedChips.filter((prevChip) => prevChip !== chip);
      }
    });
  };

  const handleCertificationeChipClick = (chip: string) => {
    setSelectedCertificationChips((prevSelectedChips) => {
      const chipIndex = prevSelectedChips.indexOf(chip);
      if (chipIndex === -1) {
        return [...prevSelectedChips, chip];
      } else {
        return prevSelectedChips.filter((prevChip) => prevChip !== chip);
      }
    });
  };

  const handleAvailabilityAllChange = () => {
    setCheckedAvailabilityAll(!checkedAvailabilityAll);
    if (!checkedAvailabilityAll) {
      setAvailabilityFilter([]);
    }
  };

  const handleAvailabiltyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const availabilityValue = event.target.value;
    if (availabilityFilter.includes(availabilityValue)) {
      setAvailabilityFilter(
        availabilityFilter.filter(
          (availability) => availability !== availabilityValue
        )
      );
    } else {
      setAvailabilityFilter([...availabilityFilter, availabilityValue]);
    }
    if (availabilityFilter.length === 4 && !checkedAvailabilityAll) {
      setCheckedAvailabilityAll(true);
    } else if (checkedAvailabilityAll) {
      setCheckedAvailabilityAll(false);
    }
  };

  const handleReleaseDateStart = (newValue: Dayjs | null) => {
    setReleaseDateStart(newValue ? newValue.format("YYYY-MM-DD") : null);
  };

  const handleReleaseDateEnd = (newValue: Dayjs | null) => {
    setReleaseDateEnd(newValue ? newValue.format("YYYY-MM-DD") : null);
  };

  const handleSelectCountryChange = (
    event: ChangeEvent<{}>,
    newValue: CountryType | null
  ) => {
    setSelectCountry(newValue);
  };

  const handleReleaseAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReleasesAll(event.target.checked);
  };
  const handleCountriesAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountriesAll(event.target.checked);
  };

  const handleReleaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const releaseValue = parseInt(event.target.value);
    const index = releasesTypes.indexOf(releaseValue);
    if (index === -1) {
      setReleasesTypes([...releasesTypes, releaseValue]);
    } else {
      setReleasesTypes(
        releasesTypes.filter((release) => release !== releaseValue)
      );
    }
  };

  const handleButtonClick = () => {
    // if (!isSearchDisabled) {
    setIsDataFetched(true);
    // setIsSearchDisabled(true);
    // setIsButtonClicked(true);
    // }
  };

  let monetizationFilterQuery = "";
  if (!checkedAvailabilityAll && availabilityFilter.length > 0) {
    monetizationFilterQuery = `&watch_region=US&with_watch_monetization_types=${monetizationFilters}`;
  }

  const {
    isLoading,
    data: movies,
    error,
  } = useMoviesAll(
    sortValue,
    userScore,
    userVote,
    genreFilters,
    runtime,
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    releaseDateStart,
    releaseDateEnd,
    selectedRegion,
    releaseTypeFilter,
    1,
    isDataFetched
  );

  useEffect(() => {
    setIsSearchDisabled(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isDataFetched && !isLoading) {
      setIsDataFetched(false);
      setIsSearchDisabled(false);
    }
  }, [isDataFetched, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: Movie[] = movies.results || [];

  console.log(selectedRegion);
  console.log(releaseTypeFilter);

  return (
    <>
      <Box>
        <h1 className="font-bold text-2xl pl-5 my-7">Popular Movies</h1>
        <Grid container spacing={2}>
          <Grid item xs={3} xl={2}>
            <MovieFilters
              runtime={runtime}
              handleRuntimeChange={handleRuntimeChange}
              sortValue={sortValue}
              handleSortChange={handleSortChange}
              userScore={userScore}
              handleUserScoreChange={handleUserScoreChange}
              userVote={userVote}
              handleUserVoteChange={handleUserVoteChange}
              selectedGenreChips={selectedGenreChips}
              handleGenreChipClick={handleGenreChipClick}
              selectedCertificationChips={selectedCertificationChips}
              handleCertificationChipClick={handleCertificationeChipClick}
              isSearchDisabled={isSearchDisabled}
              handleButtonClick={handleButtonClick}
              checkedAvailabilityAll={checkedAvailabilityAll}
              handleAvailabilityAllChange={handleAvailabilityAllChange}
              availabilityFilter={availabilityFilter}
              handleAvailabiltyChange={handleAvailabiltyChange}
              keywords={keywords}
              handleKeywordSelect={handleKeywordSelect}
              searchQuery={searchQuery}
              handleSearchInputChange={handleSearchInputChange}
              selectedKeywords={selectedKeywords}
              releaseDateStart={dayjs(releaseDateStart)}
              releaseDateEnd={dayjs(releaseDateEnd)}
              handleReleaseDateStart={handleReleaseDateStart}
              handleReleaseDateEnd={handleReleaseDateEnd}
              selectCountry={selectCountry}
              handleSelectCountryChange={handleSelectCountryChange}
              countriesAll={countriesAll}
              handleCountriesAllChange={handleCountriesAllChange}
              releaseAll={releasesAll}
              handleReleaseAllChange={handleReleaseAllChange}
              releasesTypes={releasesTypes}
              handleReleaseChange={handleReleaseChange}
            />
          </Grid>
          <Grid sx={{ pr: 2 }} item xs={9} xl={10}>
            <Box>{<MovieCards movies={popular} />}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

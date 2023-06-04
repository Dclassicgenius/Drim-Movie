import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Keyword } from "../../../types";
import { MovieFilters } from "../SideBar/MovieFilters";
import { SelectChangeEvent } from "@mui/material/Select";
import { MovieCards } from "../MovieCards/MovieCards";
import { Box, Grid, Pagination, Stack, debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../../../hooks/SearchHook/useSearchKeyword";
import { Movie, useMoviesAll } from "../../../hooks/MovieHooks/useMoviesAll";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { CountryType, countries } from "../../utility/Country/countries";
import { useTvAll } from "../../../hooks/TvHooks/useTvAll";
import { auto } from "@popperjs/core";

type MovieMainProps = {
  sortValue?: string;
  checkedAvailabilityAll?: boolean;
  releaseDateStart?: string | null;
  releaseDateEnd?: string | null;
  releasesAll?: boolean;
  releasesTypes?: number[];
  userVote?: number | string | Array<number | string>;
  pageCount?: number | undefined;
  mediaType: "tv" | "movie";
};

const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 6);
const initialReleaseDateEnd = currentDate.toISOString().substring(0, 10);

export function MovieMain({
  sortValue: initialSortValue = "popularity.desc",
  checkedAvailabilityAll: initialCheckedAvailabilityAll = true,
  releasesTypes: initialReleaseTypes = [1, 2, 3, 4, 5, 6],
  releasesAll: initialReleasesAll = true,
  releaseDateStart: initialReleaseDateStart = "",
  releaseDateEnd: initialReleaseEndDate = initialReleaseDateEnd,
  userVote: initialUserVote = 0,
  pageCount: initialPageCount = 500,
  mediaType,
}: MovieMainProps) {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [sortValue, setSortValue] = useState(initialSortValue);
  const [runtime, setRuntime] = useState<number[]>([0, 400]);
  const [userScore, setUserScore] = useState<number[]>([0, 10]);
  const [userVote, setUserVote] = useState<
    number | string | Array<number | string>
  >(initialUserVote);
  const [selectedGenreChips, setSelectedGenreChips] = useState<string[]>([]);
  const [selectedCertificationChips, setSelectedCertificationChips] = useState<
    string[]
  >([]);
  const [isChipSelected, setIsChipSelected] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [checkedAvailabilityAll, setCheckedAvailabilityAll] = useState(
    initialCheckedAvailabilityAll
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([
    "flatrate",
    "free",
    "ads",
    "rent",
    "buy",
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [releaseDateStart, setReleaseDateStart] = useState<string | null>(
    initialReleaseDateStart
  );

  const [releaseDateEnd, setReleaseDateEnd] = useState<string | null>(
    initialReleaseEndDate
  );

  const [selectCountry, setSelectCountry] = useState<CountryType | null>(
    countries.find((country) => country.code === "US") ?? null
  );

  const [releasesTypes, setReleasesTypes] =
    useState<number[]>(initialReleaseTypes);

  const [countriesAll, setCountriesAll] = useState(true);
  const [releasesAll, setReleasesAll] = useState(initialReleasesAll);
  const [firstAirDate, setFirstAirDate] = useState(true);

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
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const handleRuntimeChange = (event: Event, newValue: number | number[]) => {
    setRuntime(newValue as number[]);
  };
  const handleUserScoreChange = (event: Event, newValue: number | number[]) => {
    setUserScore(newValue as number[]);
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
        setIsChipSelected(true);
        return [...prevSelectedChips, chip];
      } else {
        const newSelectedChips = prevSelectedChips.filter(
          (prevChip) => prevChip !== chip
        );
        setIsChipSelected(newSelectedChips.length > 0);
        return newSelectedChips;
      }
    });
  };

  const handleAvailabilityAllChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedAvailabilityAll(event.target.checked);
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

  const handleFirstAirDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstAirDate(event.target.checked);
  };

  const handleButtonClick = () => {
    setIsDataFetched(true);
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
    userScore[0],
    userScore[1],
    userVote,
    genreFilters,
    runtime[0],
    runtime[1],
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    releaseDateStart,
    releaseDateEnd,
    selectedRegion,
    releaseTypeFilter,
    page,
    isDataFetched
  );

  const {
    isLoading: tvLoading,
    data: tvs,
    error: tvError,
  } = useTvAll(
    sortValue,
    userScore[0],
    userScore[1],
    userVote,
    genreFilters,
    runtime[0],
    runtime[1],
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    releaseDateStart,
    releaseDateEnd,
    page,
    isDataFetched
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: Movie[] = movies.results || [];
  const tvAll = tvs?.results || [];

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
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
              isChipSelected={isChipSelected}
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
              mediaType={mediaType}
              firstAirDate={firstAirDate}
              handleFirstAirDateChange={handleFirstAirDateChange}
            />
          </Grid>
          <Grid sx={{ pr: { sm: 2 } }} item xs={12} sm={8} md={9} lg={10}>
            <Box>
              {
                <MovieCards
                  movies={mediaType === "movie" ? popular : tvAll}
                  mediaType={mediaType}
                />
              }
            </Box>
          </Grid>
        </Grid>
        <Stack sx={{ my: 4, display: "flex", alignItems: "center" }}>
          <Pagination
            count={initialPageCount}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            boundaryCount={5}
            siblingCount={4}
          />
        </Stack>
      </Box>
    </>
  );
}

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useFetchMovies from "../../../api/api";
import { IMovie, Keyword } from "../../../types";
import { MovieFilters } from "../SideBar/MovieFilters";
import { SelectChangeEvent } from "@mui/material/Select";
import { MovieCards } from "../MovieCards/MovieCards";
import { Box, Grid, debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchKeywords } from "../../../hooks/SearchHook/useSearchKeyword";

export function PopularMovies() {
  const [apiUrl, setApiUrl] = useState(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
  );
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

  const genreFilters = selectedGenreChips.join(",").toLowerCase();
  const monetizationFilters = availabilityFilter.join("|").toLowerCase();

  const certificationFilter = selectedCertificationChips
    .map((cert) => `&certification=${cert}`)
    .join("");

  const keywordFilter = selectedKeywords
    .map((word) => `&with_keywords=${word.name.toLowerCase()}`)
    .join("|");

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

  // console.log(apiUrl);

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

  const handleButtonClick = () => {
    if (!isSearchDisabled) {
      let monetizationFilterQuery = "";
      if (!checkedAvailabilityAll && availabilityFilter.length > 0) {
        monetizationFilterQuery = `&with_watch_monetization_types=${monetizationFilters}`;
      }
      const newApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortValue}&vote_average.gte=${userScore}&vote_count.gte=${userVote}&with_genres=${genreFilters}&with_runtime.gte=${runtime}&certification_country=US${certificationFilter}&with_watch_monetization_types=${monetizationFilterQuery}${keywordFilter}`;

      setApiUrl(newApiUrl);
      setIsDataFetched(false);
      setIsSearchDisabled(true);
    }
  };
  console.log(apiUrl);

  useEffect(() => {
    setIsDataFetched(true);
  }, [apiUrl]);

  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: IMovie[] = movies || [];

  // console.log(selectedKeywords);

  return (
    <>
      <Box>
        <h1 className="font-bold text-2xl pl-5 my-7">Popular Movies</h1>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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
            />
          </Grid>
          <Grid sx={{ pr: 2 }} item xs={9}>
            <Box>{isDataFetched && <MovieCards movies={popular} />}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

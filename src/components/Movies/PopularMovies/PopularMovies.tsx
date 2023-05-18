import { ChangeEvent, useEffect, useState } from "react";
import useFetchMovies from "../../../api/api";
import { IMovie } from "../../../types";
import { ItemCard } from "../../Movie/ItemCard";
import { Movie } from "../../Movie/Movie";
import { MovieFilters } from "../SideBar/MovieFilters";
import { SelectChangeEvent } from "@mui/material/Select";

export function PopularMovies() {
  const [sortValue, setSortValue] = useState("");
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
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [checkedAvailabilityAll, setCheckedAvailabilityAll] = useState(true);

  const genreFilters = selectedGenreChips.join(",").toLocaleLowerCase();

  const certificationFilter = selectedCertificationChips
    .map((cert) => `&certification=${cert}`)
    .join("");

  useEffect(() => {
    if (
      sortValue !== "" ||
      runtime !== 0 ||
      userScore !== 0 ||
      userVote !== 0 ||
      selectedGenreChips.length > 0 ||
      selectedCertificationChips.length > 0
    ) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  }, [
    sortValue,
    runtime,
    userScore,
    userVote,
    selectedGenreChips,
    selectedCertificationChips,
  ]);

  let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  console.log(apiUrl);

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

  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const itemValue = event.target.value;
    const index = availabilityFilter.indexOf(itemValue);
    if (index === -1) {
      setAvailabilityFilter([...availabilityFilter, itemValue]);
    } else {
      setAvailabilityFilter(
        availabilityFilter.filter((item) => item !== itemValue)
      );
    }
  };

  const handleAvailabilityAllChange = () => {
    setCheckedAvailabilityAll(!checkedAvailabilityAll);
  };

  const handleButtonClick = () => {
    if (!isSearchDisabled) {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortValue}&vote_average.gte=${userScore}&vote_count.gte=${userVote}&with_genres=${genreFilters}&with_runtime.gte=${runtime}&certification_country=US${certificationFilter}`;
    }
  };

  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: IMovie[] = movies || [];

  // useEffect(() => {
  //   console.log(selectedChips);
  // }, [selectedChips]);

  return (
    <>
      <h1 className="font-bold text-2xl ml-10 mt-4">Popular Movies</h1>
      <div className="grid grid-cols-9 m-4">
        <section className="col-span-2">
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
            handleAvailabiltyChange={handleAvailabilityChange}
          />
        </section>
        <section className="w-11/12 mx-auto pt-6 col-span-7">
          <div className="">
            <ItemCard movies={popular} />
          </div>
        </section>
      </div>
    </>
  );
}

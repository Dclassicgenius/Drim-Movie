import { ChangeEvent, useCallback, useContext, useState } from "react";
import { Keyword } from "../../../types";
import { CountryType, countries } from "../FilterComponents/Country/countries";
import { SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash";
import { fetchKeywords } from "../../utility/searchKeyword";
import { FilterContext } from "../Context/FilterContext";

export const useFilterContext = () => useContext(FilterContext);

type FilterMainProps = {
  sortValue?: string;
  checkedAvailabilityAll?: boolean;
  releaseDateStart?: string | null;
  releaseDateEnd?: string | null;
  releasesAll?: boolean;
  releasesTypes?: number[];
  userVote?: number | string | Array<number | string>;
};

type FilterStateProviderProps = {
  children: React.ReactNode;
  mediaType: "tv" | "movie";
  initialFilterState?: FilterMainProps;
};

const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 6);

const initialReleaseDateEnd = currentDate.toISOString().substring(0, 10);

export const FilterStateProvider = ({
  mediaType,
  children,
  initialFilterState,
}: FilterStateProviderProps) => {
  const {
    sortValue: initialSortValue = "popularity.desc",
    checkedAvailabilityAll: initialCheckedAvailabilityAll = true,
    releasesTypes: initialReleaseTypes = [1, 2, 3, 4, 5, 6],
    releasesAll: initialReleasesAll = true,
    releaseDateStart: initialReleaseDateStart = "",
    releaseDateEnd: initialReleaseEndDate = initialReleaseDateEnd,
    userVote: initialUserVote = 0,
  } = initialFilterState || {};

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

  const [releaseDateStart, setReleaseDateStart] = useState<Dayjs | null>(
    initialReleaseDateStart ? dayjs(initialReleaseDateStart) : null
  );

  const [releaseDateEnd, setReleaseDateEnd] = useState<Dayjs | null>(
    initialReleaseEndDate ? dayjs(initialReleaseEndDate) : null
  );

  const [selectCountry, setSelectCountry] = useState<CountryType | null>(
    countries.find((country) => country.code === "US") ?? null
  );

  const [releasesTypes, setReleasesTypes] =
    useState<number[]>(initialReleaseTypes);

  const [countriesAll, setCountriesAll] = useState(true);
  const [releasesAll, setReleasesAll] = useState(initialReleasesAll);
  const [firstAirDate, setFirstAirDate] = useState(true);

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

  const handleCertificationChipClick = (chip: string) => {
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
    const index = availabilityFilter.indexOf(availabilityValue);
    if (index === -1) {
      setAvailabilityFilter([...availabilityFilter, availabilityValue]);
    } else {
      setAvailabilityFilter(
        availabilityFilter.filter((type) => type !== availabilityValue)
      );
    }
  };

  // const handleAvailabiltyChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const availabilityValue = event.target.value;
  //   if (availabilityFilter.includes(availabilityValue)) {
  //     setAvailabilityFilter(
  //       availabilityFilter.filter(
  //         (availability) => availability !== availabilityValue
  //       )
  //     );
  //   } else {
  //     setAvailabilityFilter([...availabilityFilter, availabilityValue]);
  //   }
  //   if (availabilityFilter.length === 4 && !checkedAvailabilityAll) {
  //     setCheckedAvailabilityAll(true);
  //   } else if (checkedAvailabilityAll) {
  //     setCheckedAvailabilityAll(false);
  //   }
  // };

  const handleReleaseDateStart = (newValue: Dayjs | null) => {
    setReleaseDateStart(newValue);
  };

  const handleReleaseDateEnd = (newValue: Dayjs | null) => {
    setReleaseDateEnd(newValue);
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

  return (
    <FilterContext.Provider
      value={{
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
        selectedKeywords,
        keywords,
        searchQuery,
        handleSearchInputChange,
        handleKeywordSelect,
        releaseDateStart,
        handleReleaseDateStart,
        releaseDateEnd,
        handleReleaseDateEnd,
        countriesAll,
        handleCountriesAllChange,
        selectCountry,
        handleSelectCountryChange,
        releasesTypes,
        handleReleaseAllChange,
        handleReleaseChange,
        mediaType,
        firstAirDate,
        handleFirstAirDateChange,
        releasesAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

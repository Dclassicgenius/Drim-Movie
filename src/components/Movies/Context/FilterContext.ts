import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent, createContext } from "react";
import { Keyword } from "../../../types";
import { CountryType } from "../FilterComponents/Country/countries";

interface FiltersContextType {
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
  //   releaseAll: boolean;
  releasesTypes: number[];
  handleReleaseAllChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleReleaseChange: (event: ChangeEvent<HTMLInputElement>) => void;
  mediaType: "tv" | "movie";
  firstAirDate: boolean;
  handleFirstAirDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  releasesAll: boolean;
}

export const FilterContext = createContext<FiltersContextType | undefined>(
  undefined
);

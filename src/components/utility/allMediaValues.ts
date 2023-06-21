import dayjs, { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { FilterContext } from "../Movies/Context/FilterContext";

export const apiFetchValues = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    sortValue,
    runtime,
    userScore,
    userVote,
    selectedGenreChips,
    selectedCertificationChips,
    availabilityFilter,
    checkedAvailabilityAll,
    selectedKeywords,
    releaseDateStart,
    releaseDateEnd,
    selectCountry,
    releasesTypes,
  } = filterState;

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

  let monetizationFilterQuery = "";
  if (!checkedAvailabilityAll && availabilityFilter.length > 0) {
    monetizationFilterQuery = `&watch_region=US&with_watch_monetization_types=${monetizationFilters}`;
  }

  function isNumberArray(value: number | number[]): value is number[] {
    return Array.isArray(value);
  }

  function DateString(newValue: Dayjs | null) {
    return newValue ? newValue.format("YYYY-MM-DD") : "";
  }

  const userScoreStart = isNumberArray(userScore) ? userScore[0] : 0;
  const userScoreEnd = isNumberArray(userScore) ? userScore[1] : 0;
  const runttimeStart = isNumberArray(runtime) ? runtime[0] : 0;
  const runtimeEnd = isNumberArray(runtime) ? runtime[1] : 0;

  const formatDateStart = DateString(
    releaseDateStart ? dayjs(releaseDateStart) : null
  );
  const formatDateEnd = DateString(
    releaseDateEnd ? dayjs(releaseDateEnd) : null
  );

  return {
    sortValue,
    userScoreStart,
    userScoreEnd,
    runttimeStart,
    runtimeEnd,
    userVote,
    formatDateStart,
    formatDateEnd,
    genreFilters,
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    selectedRegion,
    releaseTypeFilter,
  };
};

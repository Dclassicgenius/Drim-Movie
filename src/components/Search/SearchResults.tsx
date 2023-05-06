import { useState } from "react";
import { MediaSearchCard } from "./MediaSearchCard";
import { PeopleSearchCard } from "./PeopleSearchCard";
import { SearchSideBar, SearchTab } from "./SearchSideBar";
import { useMultiSearch } from "../../hooks/SearchHook/useMultiSearch";
import {
  Collections,
  MultiSearchResult,
  Person,
} from "./SearchType/SearchType";
import { IMovie } from "../../types";
import { useParams } from "react-router-dom";
import { Pagination } from "../Layout/Pagination";

const tabs = [
  {
    id: 1,
    label: "Movies",
    size: null as number | null,
  },
  {
    id: 2,
    label: "Tv Shows",
    size: null as number | null,
  },
  {
    id: 3,
    label: "People",
    size: null as number | null,
  },
  {
    id: 4,
    label: "Collections",
    size: null as number | null,
  },
];

export function SearchResults() {
  const [activeTab, setActiveTab] = useState<SearchTab>(tabs[0]);
  const [page, setPage] = useState(1);
  const { query } = useParams();

  if (query === undefined) {
    throw new Error("query is undefined");
  }

  const {
    isLoading,
    isError,
    error,
    data: searchResults,
    isFetching,
    isPreviousData,
  } = useMultiSearch(page, query);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const queryResult = searchResults.results || [];

  const isPerson = (item: IMovie | Person | Collections): item is Person =>
    (item as Person).media_type === "person";
  const isMovie = (item: IMovie | Person | Collections): item is IMovie =>
    (item as IMovie).media_type === "movie";
  const isTvShow = (item: IMovie | Person | Collections): item is IMovie =>
    (item as IMovie).media_type === "tv";
  //   const isCollection = (item: IMovie | Person | Collections): item is Collections =>
  //   (item as Collections).media_type === "collection";

  const movieResults = queryResult.filter(isMovie);

  const tvResults = queryResult.filter(isTvShow);

  const peopleResult = queryResult.filter(isPerson);

  tabs[0].size = movieResults.length;
  tabs[1].size = tvResults.length;
  tabs[2].size = peopleResult.length;

  const lastPage = searchResults.total_pages;
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <>
      <div className="grid grid-cols-5 pl-16 pt-16">
        <SearchSideBar
          tabs={tabs}
          handleTabClick={setActiveTab}
          activeTab={activeTab}
        />

        {activeTab.label === "Movies" && (
          <MediaSearchCard media={movieResults} />
        )}
        {activeTab.label === "Tv Shows" && (
          <MediaSearchCard media={tvResults} />
        )}
        {activeTab.label === "People" && (
          <PeopleSearchCard persons={peopleResult} />
        )}
      </div>

      {/* <Pagination
        page={page}
        isPreviousData={isPreviousData}
        lastPage={lastPage}
        pages={pages}
        setPage={setPage}
      /> */}
    </>
  );
}

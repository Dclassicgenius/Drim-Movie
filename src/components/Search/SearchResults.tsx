import { useEffect, useState } from "react";
import { MediaSearchCard } from "./MediaSearchCard";
import { PeopleSearchCard } from "./PeopleSearchCard";
import { SearchSideBar, SearchTab } from "./SearchSideBar";
import { Collections, Person, SearchResult } from "./SearchType/SearchType";
import { IMovie } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../Layout/Pagination";
import { useSearchResult } from "../../hooks/SearchHook/useSearchResult";
import { FaSearch } from "react-icons/fa";
import { TextInput } from "flowbite-react";
import { SearchInput } from "../Layout/SearchInput";

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
];

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<SearchTab>(tabs[0]);
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [personPage, setPersonPage] = useState(1);

  const { query } = useParams();

  if (query === undefined) {
    throw new Error("query is undefined");
  }

  const {
    data: movieSearchResults,
    isLoading: movieLoading,
    isError: movieError,
  } = useSearchResult(moviePage, "movie", query);

  const {
    data: tvSearchResults,
    isLoading: tvLoading,
    isError: tvError,
  } = useSearchResult(tvPage, "tv", query);

  const {
    data: peopleSearchResults,
    isLoading: peopleLoading,
    isError: peopleError,
  } = useSearchResult(personPage, "person", query);

  function isMovie(value: SearchResult): value is IMovie {
    return (
      typeof value === "object" && value && value.hasOwnProperty("release_date")
    );
  }

  function isTvShow(value: SearchResult): value is IMovie {
    return (
      typeof value === "object" &&
      value &&
      value.hasOwnProperty("first_air_date")
    );
  }

  function isPerson(value: SearchResult): value is Person {
    return (
      typeof value === "object" &&
      value &&
      value.hasOwnProperty("id") &&
      value.hasOwnProperty("name") &&
      value.hasOwnProperty("known_for") &&
      value.hasOwnProperty("known_for_department") &&
      value.hasOwnProperty("gender")
    );
  }

  const movieResults = (movieSearchResults?.results || []).filter(isMovie);
  const tvResults = (tvSearchResults?.results || []).filter(isTvShow);

  const peopleResult = (peopleSearchResults?.results || []).filter(isPerson);

  useEffect(() => {
    console.log("Movie Results:", movieResults);
    console.log("TV Results:", tvResults);
    console.log("People Results:", peopleResult);
  }, [movieResults, tvResults, peopleResult]);

  const updatedTabs = tabs.map((tab) => ({
    ...tab,
    size:
      tab.id === 1
        ? movieSearchResults?.total_results ?? 0
        : tab.id === 2
        ? tvSearchResults?.total_results ?? 0
        : peopleSearchResults?.total_results ?? 0,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
      <section className="pt-2">
        <SearchInput
          searchQuery={searchQuery}
          handleSubmit={handleSubmit}
          setSearchQuery={setSearchQuery}
        />
      </section>

      <div className="grid sm:grid-cols-5 p-5 sm:pl-16 sm:pt-16">
        <SearchSideBar
          tabs={updatedTabs}
          handleTabClick={setActiveTab}
          activeTab={activeTab}
        />

        <div className="sm:col-span-4">
          {activeTab.label === "Movies" && (
            <>
              <MediaSearchCard media={movieResults} />
              {movieSearchResults && movieSearchResults.total_pages > 1 && (
                <Pagination
                  currentPage={moviePage}
                  totalPages={movieSearchResults.total_pages}
                  setCurrentPage={(moviePage) => setMoviePage(moviePage + 1)}
                />
              )}
            </>
          )}
          {activeTab.label === "Tv Shows" && (
            <>
              <MediaSearchCard media={tvResults} />
              {tvSearchResults && tvSearchResults.total_pages > 1 && (
                <Pagination
                  currentPage={tvPage}
                  totalPages={tvSearchResults.total_pages}
                  setCurrentPage={(tvPage) => setTvPage(tvPage + 1)}
                />
              )}
            </>
          )}
          {activeTab.label === "People" && (
            <>
              <PeopleSearchCard persons={peopleResult} />
              {peopleSearchResults && peopleSearchResults.total_pages > 1 && (
                <Pagination
                  currentPage={personPage}
                  totalPages={peopleSearchResults.total_pages}
                  setCurrentPage={(personPage) => setPersonPage(personPage + 1)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

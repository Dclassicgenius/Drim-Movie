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
  console.log(movieSearchResults);

  const {
    data: tvSearchResults,
    isLoading: tvLoading,
    isError: tvError,
  } = useSearchResult(tvPage, "tv", query);
  console.log(tvSearchResults);

  const {
    data: peopleSearchResults,
    isLoading: peopleLoading,
    isError: peopleError,
  } = useSearchResult(personPage, "person", query);
  console.log(peopleSearchResults);

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
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    window.location.reload();
  };

  return (
    <>
      <section className="pt-2">
        <form className="flex items-center px-16" onSubmit={handleSubmit}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <TextInput
              type="search"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for a movie, tv show, person"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </section>

      <div className="grid grid-cols-5 pl-16 pt-16">
        <SearchSideBar
          tabs={updatedTabs}
          handleTabClick={setActiveTab}
          activeTab={activeTab}
        />

        <div className="col-span-4">
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

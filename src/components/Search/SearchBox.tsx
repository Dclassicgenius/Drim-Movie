import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchInput } from "../Layout/SearchInput";

export function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
      <section className="w-11/12 px-10 py-20 bg-[#1a75d2] mx-auto text-white">
        <h1 className="text-4xl font-bold">Welcome.</h1>
        <p className="font-semibold text-2xl pb-7">
          Millions of movies, TV shows and people to discover. explore now.
        </p>
        <SearchInput
          searchQuery={searchQuery}
          handleSubmit={handleSubmit}
          setSearchQuery={setSearchQuery}
        />
      </section>
    </>
  );
}

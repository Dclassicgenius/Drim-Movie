import { FreeToWatch } from "./components/FreeToWatch/FreeToWatch";
import { LatestTrailer } from "./components/LatestTrailers/LatestTrailer";

import { Popular } from "./components/Popular/Popular";
import { SearchBox } from "./components/Search/SearchBox";
import { Trending } from "./components/Trending/Trending";

export function Home() {
  return (
    <>
      <SearchBox />
      <Trending />
      <LatestTrailer />
      <Popular />
      <FreeToWatch />
    </>
  );
}

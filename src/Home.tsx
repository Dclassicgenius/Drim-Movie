import { FreeToWatch } from "./FreeToWatch/FreeToWatch";
import { LatestTrailer } from "./LatestTrailers/LatestTrailer";

import { Popular } from "./Popular/Popular";
import { SearchBox } from "./SearchBox";
import { Trending } from "./Trending/Trending";

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

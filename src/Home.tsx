import { FreeToWatch } from "./FreeToWatch";
import { LatestTrailer } from "./LatestTrailer";
import { Popular } from "./Popular";
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

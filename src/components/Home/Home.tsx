import { FreeToWatch } from "./FreeToWatch/FreeToWatch";
import { Popular } from "./Popular/Popular";
import { SearchBox } from "../Search/SearchBox";
import { Trending } from "./Trending/Trending";
import { LatestTrailers } from "./Latest Trailers/LatestTrailers";

export function Home() {
  return (
    <>
      <SearchBox />
      <Trending />
      <LatestTrailers />
      <Popular />
      <FreeToWatch />
    </>
  );
}

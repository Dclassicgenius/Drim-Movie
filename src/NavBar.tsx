import { Link } from "react-router-dom";
import NavBarMenu from "./components/Layout/NavBar/NavBarMenu";

export function NavBar() {
  const movies = [
    { id: 1, name: "Popular" },
    { id: 2, name: "Now Playing" },
    { id: 3, name: "Upcoming" },
    { id: 4, name: "Top Rated" },
  ];
  const tvs = [
    { id: 1, name: "Popular" },
    { id: 2, name: "Airing Today" },
    { id: 3, name: "Upcoming" },
    { id: 4, name: "Top Rated" },
  ];
  const people = [{ id: 1, name: "Popular people" }];

  return (
    <>
      <header className="sticky top-0 z-20 bg-green-800 text-white">
        <section className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <div className="flex gap-6 items-center ">
            <Link to={"/"} key={"home"}>
              <h1 className="text-2xl text-[#55c2bf]">Drim Movie</h1>
            </Link>
            <nav>
              <nav
                className="hidden space-x-8 text-l md:flex"
                aria-label="main"
              >
                <NavBarMenu
                  header="Movies"
                  menuItem={movies}
                  mediaType="movie"
                />
                <NavBarMenu header="TV Shows" menuItem={tvs} mediaType="tv" />
                <NavBarMenu
                  header="People"
                  menuItem={people}
                  mediaType="people"
                />
              </nav>
            </nav>
          </div>
          <div className="flex gap-8 items-center">
            <a href="">Login</a>
            <a href="">&#128269;</a>
          </div>
        </section>
      </header>
    </>
  );
}

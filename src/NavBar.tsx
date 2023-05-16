import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-[#1a56db] text-white">
        <section className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <div className="flex gap-6 items-center ">
            <Link to={"/"} key={"home"}>
              <h1 className="text-2xl text-[#55c2bf]">Drim Movie</h1>
            </Link>
            <nav>
              <nav
                className="hidden space-x-8 text-l md:block md:flex"
                aria-label="main"
              >
                <Dropdown label="Movies" dismissOnClick={false} inline={true}>
                  <Link to={"movies/popular"}>
                    <Dropdown.Item>Popular</Dropdown.Item>
                  </Link>
                  <Dropdown.Item>Now Playing</Dropdown.Item>
                  <Dropdown.Item>Upcoming</Dropdown.Item>
                  <Dropdown.Item>Top Rated</Dropdown.Item>
                </Dropdown>

                <Dropdown label="Tv Shows" dismissOnClick={false} inline={true}>
                  <Dropdown.Item>Popular</Dropdown.Item>
                  <Dropdown.Item>Airing Today</Dropdown.Item>
                  <Dropdown.Item>On TV</Dropdown.Item>
                  <Dropdown.Item>Top Rated</Dropdown.Item>
                </Dropdown>

                <Dropdown label="People" dismissOnClick={false} inline={true}>
                  <Dropdown.Item>Popular people</Dropdown.Item>
                </Dropdown>
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

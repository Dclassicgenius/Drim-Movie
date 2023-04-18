export function NavBar() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-[#032541] text-white">
        <section className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <div className="flex gap-6 items-center ">
            <h1 className="text-2xl text-[#55c2bf]">Drim Movie</h1>
            <nav>
              <nav
                className="hidden space-x-8 text-l md:block"
                aria-label="main"
              >
                <a href="#" className="hover:opacity-90">
                  Movies
                </a>
                <a href="#" className="hover:opacity-90">
                  TV Shows
                </a>
                <a href="#" className="hover:opacity-90">
                  People
                </a>
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

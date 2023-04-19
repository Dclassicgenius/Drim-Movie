import { FaStar } from "react-icons/fa";

export function Review() {
  return (
    <>
      <section className="px-10 pb-6">
        <hr />
        <h2 className="font-bold text-lg pt-6 pb-4">
          Reviews <span className="text-[#c0baba] text-sm">10</span>
        </h2>
        <article className="shadow rounded-xl overflow-hidden p-6 border flex gap-4 items-start">
          <figure className="min-w-[50px] w-[70px] ">
            <a href="#">
              <img
                src="https://secure.gravatar.com/avatar/992eef352126a53d7e141bf9e8707576.jpg?s=300"
                alt=""
                className="w-full h-full rounded-full"
              />
            </a>
          </figure>

          <div className="pt-3">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-bold">A review by Nutshell</h2>
              <div className="flex gap-1 items-center text-xs rounded-lg bg-black text-white px-2 py-1 w-12">
                <FaStar /> 6.0
              </div>
            </div>
            <p className="text-xs font-light mb-10">
              written by <span className="font-semibold">Nutshell</span> on 3
              August 2019
            </p>

            <p className="text-sm font-normal">
              Zachary Levi is a hoot in this super-hero comedy reminiscent of
              the now classic Big with Tom Hanks. We get a solid first half,
              even two thirds, but why oh why do these movies almost always seem
              to revert to formula in the 3rd act? Been there, done that...
            </p>
          </div>
        </article>
        <p className="font-bold text-lg pt-4">
          <a href="#">Read All Reviews</a>
        </p>
      </section>
    </>
  );
}

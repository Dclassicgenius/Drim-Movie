import { FaCircle } from "react-icons/fa";
import { Cast, Crew } from "./PeopleType";
import { Link } from "react-router-dom";
import { DetailPopUp } from "./DetailPopUp";
import { useEffect, useState } from "react";
// import Tippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type CreditListProps = {
  credit: Cast[] | Crew[];
};

export function CreditList({ credit }: CreditListProps) {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [arrowDirection, setArrowDirection] = useState("up");

  function togglePopup(itemId: number) {
    setSelectedItemId(itemId);
  }

  function updateArrowDirection(instance: any) {
    const placement = instance.props.placement;
    if (placement.startsWith("top")) {
      setArrowDirection("down");
    } else if (placement.startsWith("bottom")) {
      setArrowDirection("up");
    }
  }

  function getYearOrUnderscore(dateString: string) {
    if (!dateString) {
      return "-----";
    }
    return new Date(dateString).getFullYear();
  }

  function isCast(credit: Cast | Crew): credit is Cast {
    return (credit as Cast).character !== undefined;
  }

  function isCrew(credit: Cast | Crew): credit is Crew {
    return (credit as Crew).job !== undefined;
  }

  const sortedData = credit.sort((a, b) => {
    const yearA = getYearOrUnderscore(
      a.media_type === "tv" ? a.first_air_date : a.release_date
    );
    const yearB = getYearOrUnderscore(
      b.media_type === "tv" ? b.first_air_date : b.release_date
    );

    if (yearA === "-----" && yearB === "-----") {
      return 0;
    }
    if (yearA === "-----") {
      return -1;
    }
    if (yearB === "-----") {
      return 1;
    }
    return yearB - yearA;
  });

  let currentYear: string | number | null = null;

  const Arrow = () => (
    <div
      className="w-2 h-2 bg-[#032541] transform rotate-45"
      data-popper-arrow
    ></div>
  );
  //
  return (
    <>
      {sortedData.map((credit) => {
        const year = getYearOrUnderscore(
          credit.media_type === "tv"
            ? credit.first_air_date
            : credit.release_date
        );

        const hrElement = year !== currentYear ? <hr key={year} /> : null;
        currentYear = year;

        return (
          <>
            {hrElement}
            <div className="flex gap-4 p-4 items-center" key={credit.id}>
              <p>{year}</p>
              <Tippy
                // onCreate={updateArrowDirection}
                // onShow={updateArrowDirection}
                visible={selectedItemId === credit.id}
                onClickOutside={() => setSelectedItemId(null)}
                arrow={true}
                interactive={true}
                content={<DetailPopUp credit={credit}></DetailPopUp>}
                inlinePositioning={true}
                // placement="top"
                // render={(attrs) => (
                //   <div className="box" tabIndex={-1} {...attrs}>
                //     <div>

                //     </div>
                //     <Arrow />
                //   </div>
                // )}
              >
                <div className="text-xs rounded-full border border-black group cursor-pointer ">
                  <FaCircle
                    // className="text-white group-hover:text-blue-800 p-0.5"
                    size={8}
                    onClick={() => togglePopup(credit.id)}
                    className={`text-white group-hover:text-blue-800 p-0.5 arrow-${arrowDirection}`}
                  />
                </div>
              </Tippy>
              <p className="font-light text-[#7f7f7f]">
                {" "}
                <Link to={`/${credit.media_type}/${credit.id}`}>
                  <span className="text-black font-bold hover:text-blue-400 cursor-pointer">
                    {credit.media_type === "tv" ? credit.name : credit.title}
                  </span>
                </Link>{" "}
                {credit.media_type === "tv" && (
                  <span className="hover:text-blue-400 cursor-pointer">
                    ( {credit.episode_count}{" "}
                    {credit.episode_count === 1 ? "episode" : "episodes"} )
                  </span>
                )}
                {isCast(credit) && (
                  <>
                    {credit.character && (
                      <>
                        <span> as </span>
                        <span className="text-black">{credit.character}</span>
                      </>
                    )}
                  </>
                )}
                {isCrew(credit) && (
                  <>
                    {credit.job && (
                      <>
                        <span> ...</span>
                        <span className="text-black">{credit.job}</span>
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
}

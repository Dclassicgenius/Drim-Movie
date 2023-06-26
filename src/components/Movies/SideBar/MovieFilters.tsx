import classNames from "classnames";
import { FilterSliders } from "../FilterComponents/FilterSliders";
import { SortFilter } from "../FilterComponents/SortFilter";
import { ReleaseFilter } from "../FilterComponents/ReleaseFilter";
import { AvailabilityFilter } from "../FilterComponents/AvailabilityFilter";
import { AirDates } from "../FilterComponents/AirDates";
import { KeywordFilters } from "../FilterComponents/KeywordFilters";
import { ChipsFilter } from "../FilterComponents/ChipsFilter";
import { useState } from "react";

type MovieFiltersProps = {
  mediaType: "tv" | "movie";
};

export function MovieFilters({ mediaType }: MovieFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const handleError = (error: DateValidationError, value: Dayjs | null) => {};

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <aside className=" pb-5 px-10 [@media(min-width:600px)]:px-5">
        <div className="mb-4">
          <div>
            <SortFilter />
          </div>

          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <button
              className="text-left w-full pb-2 font-bold px-12 [@media(min-width:600px)]:px-4 pt-4  "
              onClick={toggleFilter}
            >
              Filter
            </button>
            <hr />

            <div className={classNames(isFilterOpen ? "block" : "hidden")}>
              <div>
                <AvailabilityFilter />
              </div>
              <hr />

              <div>
                <AirDates />
              </div>
              <hr
                className={classNames(mediaType === "tv" ? "block" : "hidden")}
              />

              <div>
                <ReleaseFilter />
              </div>

              <hr
                className={classNames(
                  mediaType === "movie" ? "block" : "hidden"
                )}
              />

              <div>
                <ChipsFilter />
              </div>
              <hr />

              <div>
                <FilterSliders />
              </div>
              <hr />

              <div>
                <KeywordFilters />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

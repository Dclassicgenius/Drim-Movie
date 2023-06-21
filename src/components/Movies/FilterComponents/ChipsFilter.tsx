import { useContext } from "react";
import { useCertifications } from "../../../hooks/FilterHooks/useCertifications";
import { useGenres } from "../../../hooks/FilterHooks/useGenres";
import { FilterContext } from "../Context/FilterContext";
import { FilterChips } from "./FilterChips";

export const ChipsFilter = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    selectedGenreChips,
    handleGenreChipClick,
    selectedCertificationChips,
    handleCertificationChipClick,
    isChipSelected,
    mediaType,
  } = filterState;

  const movieGenres = useGenres("movie");
  const tvGenres = useGenres("tv");
  const { data: movieCertifications } = useCertifications("movie");
  const usMovieCertifications = (movieCertifications ?? {})["US"] || [];
  const { data: tvCertifications } = useCertifications("tv");
  const usTvCertifications = (tvCertifications ?? {})["US"] || [];
  return (
    <>
      <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
        <h2 className=" font-light text-grey-500 text-sm">Genres</h2>

        <FilterChips
          selectedChips={selectedGenreChips}
          handleChipClick={handleGenreChipClick}
          chips={mediaType === "tv" ? tvGenres.data : movieGenres.data}
        />
      </section>
      <hr />
      <section className="[@media(min-width:600px)]:px-4 pt-3 px-10">
        <h2 className=" font-light text-grey-500 text-sm">Certifications</h2>
        <FilterChips
          selectedChips={selectedCertificationChips}
          handleChipClick={handleCertificationChipClick}
          chips={
            mediaType === "tv" ? usTvCertifications : usMovieCertifications
          }
          disableChips={(mediaType === "tv"
            ? usTvCertifications
            : usMovieCertifications
          ).map(
            (chip) =>
              isChipSelected &&
              !selectedCertificationChips.includes(chip.certification)
          )}
        />
      </section>
    </>
  );
};

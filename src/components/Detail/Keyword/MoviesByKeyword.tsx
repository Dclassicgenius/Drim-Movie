import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useMoviesByKeyword } from "../../../hooks/MovieKeyword/useMoviesByKeyword";
import { useParams } from "react-router-dom";
import { IMovie } from "../../../types";
import { MediaSearchCard } from "../../Search/MediaSearchCard";
import bgImage from "../../../assets/light_blue-bg.svg";
const options = [
  { name: "movie", label: "Movies" },
  { name: "tv", label: "Tv Shows" },
];

const mediaLabels = {
  movie: "Movies",
  tv: "Tv Shows",
};

function getMediaLabel(media: "movie" | "tv"): string {
  return mediaLabels[media];
}

const sortParameters = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z" },
  { value: "title.desc", label: "Title (Z-A)" },
];

export const MoviesByKeyword = () => {
  const { id, name } = useParams<{ id?: string; name?: string }>();
  const [media, setMedia] = useState<"movie" | "tv">("movie");
  const [sortValue, setSortValue] = useState("popularity.desc");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handleMediaChange = (event: SelectChangeEvent) => {
    setMedia(event.target.value as "movie" | "tv");
  };
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  const { data, isLoading, error } = useMoviesByKeyword(
    pageNumber,
    id ?? "",
    sortValue,
    media
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const movies: IMovie[] = data?.results || [];

  const resultWithMediaTypes = movies.map((movie) => ({
    ...movie,
    media_type: movie.first_air_date ? "tv" : "movie",
  }));

  return (
    <>
      <section className="">
        <div className="flex justify-between bg-[#032541] py-8 px-10">
          <h1 className="text-white font-bold text-xl">{name}</h1>
          <p className="text-[#c0baba]">
            {data?.total_results} <span>{getMediaLabel(media)}</span>
          </p>
        </div>

        <Box
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <FormControl>
            <InputLabel id="media-select">Movie/Tv</InputLabel>
            <Select
              labelId="media-select-label"
              id="media-select"
              value={media}
              label="Movie/Tv"
              onChange={handleMediaChange}
            >
              {options.map((option) => (
                <MenuItem value={option.name}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="media-select">Sort</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortValue}
              label="Sort"
              onChange={handleSortChange}
            >
              {sortParameters.map((sort) => (
                <MenuItem value={sort.value}>{sort.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <hr />
        <div className=" p-10">
          <MediaSearchCard media={resultWithMediaTypes} />
          <Pagination
            count={data?.total_pages}
            page={pageNumber}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            boundaryCount={5}
            siblingCount={4}
            sx={{ py: 3, display: "flex", justifyContent: "center" }}
          />
        </div>
      </section>
    </>
  );
};

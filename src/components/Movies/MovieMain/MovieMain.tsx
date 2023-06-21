import { useState } from "react";
import { MovieFilters } from "../SideBar/MovieFilters";
import { MovieCards } from "../MovieCards/MovieCards";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import { Movie, useMoviesAll } from "../../../hooks/MovieHooks/useMoviesAll";
import React from "react";
import { useTvAll } from "../../../hooks/TvHooks/useTvAll";
import { apiFetchValues } from "../../utility/allMediaValues";

type MovieMainProps = {
  pageCount?: number | undefined;
  mediaType: "tv" | "movie";
};

export function MovieMain({
  pageCount: initialPageCount = 500,
  mediaType,
}: MovieMainProps) {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    sortValue,
    userScoreStart,
    userScoreEnd,
    runttimeStart,
    runtimeEnd,
    userVote,
    formatDateStart,
    formatDateEnd,
    genreFilters,
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    selectedRegion,
    releaseTypeFilter,
  } = apiFetchValues();

  const {
    isLoading,
    data: movies,
    error,
  } = useMoviesAll(
    sortValue,
    userScoreStart,
    userScoreEnd,
    userVote,
    genreFilters,
    runttimeStart,
    runtimeEnd,
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    formatDateStart,
    formatDateEnd,
    selectedRegion,
    releaseTypeFilter,
    page
  );

  const {
    isLoading: tvLoading,
    data: tvs,
    error: tvError,
  } = useTvAll(
    sortValue,
    userScoreStart,
    userScoreEnd,
    userVote,
    genreFilters,
    runttimeStart,
    runtimeEnd,
    certificationFilter,
    monetizationFilterQuery,
    keywordFilter,
    formatDateStart,
    formatDateEnd,
    page
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: Movie[] = movies.results || [];
  const tvAll = tvs?.results || [];

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <MovieFilters mediaType={mediaType} />
          </Grid>
          <Grid sx={{ pr: { sm: 2 } }} item xs={12} sm={8} md={9} lg={10}>
            <Box>
              {
                <MovieCards
                  movies={mediaType === "movie" ? popular : tvAll}
                  mediaType={mediaType}
                />
              }
            </Box>
          </Grid>
        </Grid>
        <Stack sx={{ my: 4, display: "flex", alignItems: "center" }}>
          <Pagination
            count={initialPageCount}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            boundaryCount={5}
            siblingCount={4}
          />
        </Stack>
      </Box>
    </>
  );
}

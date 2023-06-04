import { Link } from "react-router-dom";
import { CircularProgressBar } from "../../utility/CircularProgressBar";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Movie } from "../../../hooks/MovieHooks/useMoviesAll";
import placeholderImage from "../../../assets/placeholderImage.png";
import { Tv } from "../../../hooks/TvHooks/useTvAll";

type movies = {};

interface MovieProps {
  movies: Movie[] | Tv[];
  mediaType: string;
}

function isMovie(value: movies): value is Movie {
  return (
    typeof value === "object" && value && value.hasOwnProperty("release_date")
  );
}

export function MovieCards({ movies, mediaType }: MovieProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ px: { xs: 4, sm: 0 } }}
        alignItems="stretch"
      >
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
              <Card sx={{ position: "relative" }}>
                <CardActionArea
                  component={Link}
                  to={`/${mediaType}/${movie.id}`}
                >
                  <CardMedia
                    component="img"
                    // height={250}
                    image={
                      movie.poster_path !== null
                        ? API_IMG + movie.poster_path
                        : placeholderImage
                    }
                    alt={isMovie(movie) ? movie.title : movie.name + "poster"}
                    sx={{
                      // height: 250,
                      width: "100%",
                      // objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ p: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        minHeight: "2.7em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {isMovie(movie) ? movie.title : movie.name}
                    </Typography>
                    <div className="absolute top-0 right-0 m-0.5 text-white rounded-full text-xs">
                      <CircularProgressBar
                        score={Number(movie.vote_average.toFixed(1))}
                        radius={20}
                      />
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      {(() => {
                        const dateValue = isMovie(movie)
                          ? movie.release_date
                          : movie.first_air_date;
                        if (dateValue) {
                          return (
                            <p className="text-[10px] pt-2 text-gray-700 dark:text-gray-400 font-light">
                              {new Date(dateValue).toLocaleDateString()}
                            </p>
                          );
                        }
                      })()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

import { Link } from "react-router-dom";
import { IMovie } from "../../../types";
import { CircularProgressBar } from "../../utility/CircularProgressBar";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface MovieProps {
  movies: IMovie[];
}

export function MovieCards({ movies }: MovieProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        {Array.isArray(movies) &&
          movies
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <Grid item xs={6} md={3} lg={2} xl={1} key={movie.id}>
                <Card sx={{ position: "relative" }}>
                  <CardActionArea component={Link} to={`/movie/${movie.id}`}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={API_IMG + movie.poster_path}
                      alt={movie.name + "poster"}
                    />
                    <CardContent sx={{ p: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        // sx={{ fontWeight: "bold" }}
                        sx={{
                          fontSize: "10px",
                          fontWeight: "bold",
                          minHeight: "3em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {movie.title || movie.name}
                      </Typography>
                      <div className="absolute top-0 right-0 m-0.5 text-white rounded-full text-xs">
                        <CircularProgressBar
                          score={Number(movie.vote_average.toFixed(1))}
                          radius={20}
                        />
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        {(() => {
                          const dateValue =
                            movie.release_date || movie.first_air_date;
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

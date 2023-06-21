import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { usePopularPeople } from "../../../hooks/People/usePopularPeople";
import { useState } from "react";
import placeholderImage from "../../../assets/placeholderImage.png";
import { Person } from "../../Search/SearchType/SearchType";
import { Link } from "react-router-dom";

export const PopularPeople = () => {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data, isLoading, error } = usePopularPeople(pageNumber);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  if (!data) {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const popularPeople: Person[] = data.results;

  return (
    <Box sx={{ mx: 4 }}>
      <h1 className="font-bold text-2xl my-7">Popular People</h1>

      <Grid container spacing={2} alignItems="stretch">
        {popularPeople.map((person) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={person.id}>
            <Card>
              <CardActionArea component={Link} to={`/people/${person.id}`}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={
                    person.profile_path
                      ? API_IMG + person.profile_path
                      : placeholderImage
                  }
                  sx={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </CardActionArea>
              <CardContent sx={{ p: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {person.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "9px",
                    minHeight: "2.7em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <ul className="list-disc">
                    <li className="text-xs list-none">
                      {person.known_for
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, 3)
                        .map((media, index, arr) => (
                          <span key={media.id}>
                            <Link
                              to={
                                media.media_type === "tv"
                                  ? `/tv/${media.id}`
                                  : `/movie/${media.id}`
                              }
                            >
                              {media.media_type === "tv"
                                ? media.name
                                : media.title}
                            </Link>
                            {index < arr.length - 1 && ", "}
                          </span>
                        ))}
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={data.total_pages}
        page={pageNumber}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        boundaryCount={5}
        siblingCount={4}
        sx={{ py: 3 }}
      />
    </Box>
  );
};

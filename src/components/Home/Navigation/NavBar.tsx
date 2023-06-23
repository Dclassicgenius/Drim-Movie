import { useLocation } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const location = useLocation();
  useEffect(() => {
    setAnchorElNav(null);
  }, [location]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const movies = [
    { id: 1, name: "Popular", to: "popular" },
    { id: 2, name: "Now Playing", to: "now-playing" },
    { id: 3, name: "Upcoming", to: "upcoming" },
    { id: 4, name: "Top Rated", to: "top-rated" },
  ];

  const tvs = [
    { id: 1, name: "Popular", to: "popular" },
    { id: 2, name: "Airing Today", to: "airing-today" },
    { id: 3, name: "On Tv", to: "on-tv" },
    { id: 4, name: "Top Rated", to: "top-rated" },
  ];
  const people = [{ id: 1, name: "Popular people", to: "popular-people" }];

  return (
    <AppBar
      position="static"
      sx={{ px: { md: 10 }, backgroundColor: "#034a95" }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".4rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DRIM MOVIE
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              color: "inherit",
            }}
          >
            <NavBarMenu header="Movies" menuItem={movies} mediaType="movie" />
            <NavBarMenu header="TV Shows" menuItem={tvs} mediaType="tv" />
            <NavBarMenu header="People" menuItem={people} mediaType="people" />
          </Menu>
        </Box>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DRIM MOVIE
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            color: "inherit",
          }}
        >
          <NavBarMenu header="Movies" menuItem={movies} mediaType="movie" />
          <NavBarMenu header="TV Shows" menuItem={tvs} mediaType="tv" />
          <NavBarMenu header="People" menuItem={people} mediaType="people" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

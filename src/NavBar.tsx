import { Link, useLocation } from "react-router-dom";
import NavBarMenu from "./components/Layout/NavBar/NavBarMenu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

export function NavBar() {
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

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const location = useLocation();
  useEffect(() => {
    setAnchorElNav(null);
  }, [location]);
  return (
    <>
      <AppBar position="static" sx={{ px: { md: 10 } }}>
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
              <NavBarMenu
                header="People"
                menuItem={people}
                mediaType="people"
              />
            </Menu>
          </Box>

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
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
    </>
  );
}

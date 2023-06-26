import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
export function FooterNav() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#034a95",
        p: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography
              gutterBottom
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".4rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              DRIM MOVIE
            </Typography>
            <Typography variant="body2" color="#c7cdd5">
              Drim Movie is your one stop for everyting movies and tv shows.
              find new, trending and popular movies and your favourite actors.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="white"
              gutterBottom
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".4rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="#c7cdd5">
              St Petersbug, Russia
            </Typography>
            <Typography variant="body2" color="#c7cdd5">
              Email: patamaechi1@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="white"
              gutterBottom
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".4rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="#c7cdd5">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/noblemalchik"
              color="#c7cdd5"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/itzClassicpat" color="#c7cdd5">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="#c7cdd5" align="center">
            {"Copyright © "}
            <Link color="#c7cdd5" href="#" underline="none">
              drim-movie
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

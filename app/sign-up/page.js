"use client";

import { SignUp } from "@clerk/nextjs";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { user } = useUser();
  return (
    <Container
      maxWidth="false"
      sx={{
        bgcolor: "#020303",
        height: "100vh",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Toolbar>
          <img
            src="../assets/icon.png"
            style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Noteify AI
          </Typography>
          <Button
            href="#home"
            color="inherit"
            sx={{
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
              },
            }}
          >
            Home
          </Button>
          <Button
            href="#home"
            color="inherit"
            sx={{
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
              },
            }}
          >
            Features
          </Button>
          <Button
            href="#home"
            color="inherit"
            sx={{
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
              },
            }}
          >
            Pricing
          </Button>
          {!user ? (
            <>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/sign-up"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <UserButton />
          )}
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: "200px" }}
      >
        <Typography variant="h4" sx={{ color: "#fff", mt: 3, mb: 3 }}>
          Not a member yet? Sign up to use Noteify AI!
        </Typography>
        <SignUp routing="hash" />
      </Box>
      <Box
        sx={{
          bgcolor: "transparent",
          color: "white",
          py: 4,
          mt: "auto",
        }}
      >
        <Divider
          orientation="horizontal"
          component="div"
          sx={{ background: "#fff", mb: 5 }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img
                  src="/assets/icon.png"
                  alt="App Icon"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    marginRight: "10px",
                  }}
                />
                <Typography variant="h5" gutterBottom>
                  Noteify AI
                </Typography>
              </Box>

              <Typography variant="body2">
                Simplify your study sessions with our powerful flashcard tool.
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Quick Links
              </Typography>
              <Link
                href="/"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  my: 1,
                  color: "#fff",
                  "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                    "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                  },
                }}
              >
                Home
              </Link>
              <Link
                href="/features"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  my: 1,
                  color: "#fff",
                  "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                    "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                  },
                }}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  my: 1,
                  color: "#fff",
                  "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                    "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                  },
                }}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  my: 1,
                  color: "#fff",
                  "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                    "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                  },
                }}
              >
                Contact Us
              </Link>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h5" gutterBottom>
                Follow Us
              </Typography>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ display: "block", my: 1 }}
              >
                <GitHub
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    mr: 1,
                    "&:hover": {
                      boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                      transform: "translateY(-0.25em)",
                    },
                  }}
                />
              </Link>

              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ display: "block", my: 1 }}
              >
                <LinkedIn
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    "&:hover": {
                      boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                      transform: "translateY(-0.25em)",
                    },
                  }}
                />
              </Link>
            </Grid>
          </Grid>

          <Box mt={4} textAlign="center">
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Noteify AI. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

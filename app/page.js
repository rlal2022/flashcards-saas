"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { Memory, Devices, Create, GitHub, LinkedIn } from "@mui/icons-material";
import getStripe from "./utils/getStripe";
import { UserButton, useUser } from "@clerk/nextjs";
import "../app/globals.css";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch("/api/checkout_session", {
        method: "POST",
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSessionJson.error) {
        console.error(checkoutSessionJson.error.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    /* <--------------------------------------------------------------NAVBAR-------------------------------------------------------------->*/

    <Container
      maxWidth="false"
      sx={{
        bgcolor: "#020303",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <section id="home">
        <Box
          sx={{
            flexGrow: 1,
            color: "#c34a36",
          }}
        >
          <AppBar
            sx={{
              bgcolor: "transparent",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            position="static"
          >
            <Toolbar
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
              }}
            >
              <img
                src="/assets/icon.png"
                alt="App Icon"
                style={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  marginRight: "10px",
                }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                }}
              >
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
                href="#features"
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
              >
                Features
              </Button>
              <Button
                href="#pricing"
                color="inherit"
                sx={{
                  "&:hover": { color: "rgba(245, 245, 245, 0.7)" },
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
        </Box>

        {/* <--------------------------------------------------------------HERO SECTION-------------------------------------------------------------->*/}

        <Box
          sx={{
            color: "#ffffff",
            padding: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
              },
            }}
          >
            <img
              src={"./assets/icon.png"}
              style={{
                width: "160px",
                height: "160px",
                marginTop: "3.5%",
                marginRight: "20px",
              }}
            />
            <Typography
              mb={1}
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                  lg: "12rem",
                },
              }}
              fontWeight={400}
            >
              Noteify AI
            </Typography>
          </Box>
          <Typography
            mb={1}
            variant="h3"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "64px",
                lg: "64px",
                xl: "64px",
              },
            }}
            fontWeight={300}
          >
            Studying Just Got A Lot Easier
          </Typography>
          <Typography
            variant="h3"
            mb={6}
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "48px",
                lg: "48px",
                xl: "48px",
              },
            }}
            fontWeight={300}
          >
            AI-powered flashcards tailored to your notes
          </Typography>
          <Button
            variant="contained"
            sx={{
              p: "10px 40px 10px 40px",
              fontSize: "24px",
              fontWeight: "400",
              color: "#fff",
              bgcolor: "transparent",
              border: "1px solid white",
              boxshadow: "0 0.5rem -0.4em rgba(255,255,255,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                bgcolor: "rgba(245, 245, 245, 0.1)",
                borderColor: "white",
                boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                transform: "translateY(-0.25em)",
              },
            }}
            href="/generate"
          >
            Get Started
          </Button>
        </Box>
      </section>

      <section id="features">
        {/* <--------------------------------------------------------------FEATURES SECTION-------------------------------------------------------------->*/}
        <Box sx={{ my: 6, bgcolor: "#020303" }}>
          <Typography
            variant="h3"
            component="h2"
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "400",
            }}
            gutterBottom
          >
            Features
          </Typography>
          <Grid container spacing={4} sx={{ mb: "200px" }}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#fff",
                  bgcolor: "transparent",
                }}
              >
                <Memory sx={{ marginRight: 1, fontSize: "70px" }} />
                <Typography variant="h6" gutterBottom>
                  Smart Flashcards
                </Typography>
                <Typography fontSize={"18px"}>
                  Our AI effortlessly transforms your notes into clear, concise
                  flashcards, optimized for effective studying.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#fff",
                  bgcolor: "transparent",
                }}
              >
                <Devices sx={{ marginRight: 1, fontSize: "70px" }} />
                <Typography variant="h6" gutterBottom>
                  Study Anytime, Anywhere
                </Typography>
                <Typography fontSize={"18px"}>
                  Retrieve your flashcards from any device, wherever you are.
                  Enjoy seamless studying on the go.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#fff",
                  bgcolor: "transparent",
                }}
              >
                <Create sx={{ marginRight: 1, fontSize: "70px" }} />
                <Typography variant="h6" gutterBottom>
                  Effortless Creation
                </Typography>
                <Typography fontSize={"18px"}>
                  Just enter your text and let our AI handle the rest. Crafting
                  flashcards is now simpler than ever.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </section>

      <section id="pricing">
        {/* <--------------------------------------------------------------PRICING SECTION-------------------------------------------------------------->*/}
        <Box
          sx={{
            my: 6,
            textAlign: "center",
            color: "#fff",
            height: "100%",
            mb: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" mb={5}>
            Pricing
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Grid item xs={9} md={3}>
              <Box
                sx={{
                  pb: 3,
                  width: "275px",
                  height: "250px",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 1,
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow:
                      "0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  mt={2}
                  sx={{ fontSize: "36px" }}
                  gutterBottom
                >
                  Basic
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "24px" }} gutterBottom>
                  $5 / month
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "fff",
                    background: "transparent",
                    border: "1px solid white",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Choose Pro
                </Button>
              </Box>
            </Grid>
            <Grid item xs={9} md={3}>
              <Box
                sx={{
                  pb: 3,
                  width: "275px",
                  height: "250px",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 1,
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow:
                      "0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  mt={2}
                  sx={{ fontSize: "36px" }}
                  gutterBottom
                >
                  Pro
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "24px" }} gutterBottom>
                  $10 / month
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  Unlimited flashcards and storage, with priority support.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "fff",
                    background: "transparent",
                    border: "1px solid white",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={9} md={2}>
              <Box
                sx={{
                  pb: 3,
                  width: "275px",
                  height: "250px",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 1,
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    boxShadow:
                      "0px 4px 20px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  mt={2}
                  sx={{ fontSize: "36px" }}
                  gutterBottom
                >
                  Advanced
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "24px" }} gutterBottom>
                  $20 / month
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  Unlimited flashcards, storage, priority support and premium
                  features
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    color: "fff",
                    background: "transparent",
                    border: "1px solid white",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Choose Advanced
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </section>

      {/* <--------------------------------------------------------------FOOTER-------------------------------------------------------------->*/}

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

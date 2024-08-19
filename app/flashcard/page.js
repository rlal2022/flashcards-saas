"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Toolbar,
  AppBar,
  Divider,
} from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashCards() {
      try {
        if (!user) {
          setFlashcards([]);
          return;
        }

        const docRef = doc(db, "users", user.id);
        const flashcardsDocRef = doc(docRef, "flashcard_sets", search);

        const docSnap = await getDoc(flashcardsDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.flashcards && Array.isArray(data.flashcards)) {
            setFlashcards(data.flashcards);
          } else {
            setFlashcards([]);
          }
        } else {
          setFlashcards([]);
        }
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setFlashcards([]);
      }
    }
    getFlashCards();
  }, [user, search]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Container maxWidth="false" sx={{ bgcolor: "#020303", height: "100%" }}>
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
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                marginRight: "10px",
              }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Noteify AI
            </Typography>
            <Button
              href="/home"
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
          sx={{
            display: "flex",
            mt: 10,
            ml: 2,
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            href="/flashcards"
            sx={{
              p: "10px 25px 10px 25px",
              fontSize: "18px",
              bgcolor: "transparent",
              color: "#fff",
              border: "1px solid white",
              "&:hover": {
                bgcolor: "transparent",
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "#020303",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    handleCardClick(index);
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: "#fff",
                        bgcolor: "#020303",
                        perspective: "1000px",
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                        "& > div": {
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        },
                        "& > div > div": {
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                          borderRadius: "10px",
                          backgroundColor: "#0A0A0A",
                        },
                        "& > div > div:nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography varian="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography varian="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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
                &copy; {new Date().getFullYear()} Noteify AI. All rights
                reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
}

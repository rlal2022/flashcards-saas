"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
  Toolbar,
  Button,
  AppBar,
  Divider,
} from "@mui/material";
import "../globals.css";
import Link from "next/link.js";
import { GitHub, LinkedIn } from "@mui/icons-material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        if (!user) return;

        const docRef = doc(db, "users", user.id);
        const flashcardsRef = collection(docRef, "flashcard_sets");

        const docSnap = await getDocs(flashcardsRef);
        const data = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFlashcards(data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setError("Failed to load flashcards.");
      }
    };

    getFlashcards();
  }, [user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#020303", height: "100vh" }}>
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

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {flashcards.length > 0 ? (
          flashcards.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "#0A0A0A",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(set.name)}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {set.name.toUpperCase()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              textAlign: "center",
              ml: 20,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#fff" }}>
              You have no Flashcards yet, start generating some now!
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "#111111",
                borderColor: "#000",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#000",
                  background: "#414141",
                },
              }}
              onClick={() => router.push("/generate")}
            >
              Generate
            </Button>
          </Box>
        )}
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
              &copy; {new Date().getFullYear()} Noteify AI. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

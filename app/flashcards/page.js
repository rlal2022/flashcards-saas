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
} from "@mui/material";
import Link from "next/link";

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
    <Container maxWidth="lg">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "600", cursor: "pointer" }}>
          <Link href="../" style={{ textDecoration: "none", color: "inherit" }}>
            FlashCards SaaS
          </Link>
        </Typography>
        <Box>
          <SignedOut>
            <Button
              variant="outlined"
              color="inherit"
              href="/sign-in"
              sx={{ mx: 1, borderRadius: 3 }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {flashcards.length > 0 ? (
          flashcards.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
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
                      {set.name}
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
            <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
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
    </Container>
  );
}

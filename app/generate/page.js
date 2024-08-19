"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
} from "@mui/material";
import { db } from "../firebase.js";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Generate() {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return (
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "#020303",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img
            src={"../assets/icon.png"}
            style={{
              width: "160px",
              height: "160px",
              marginTop: "3.5%",
              marginRight: "20px",
            }}
          />
          <Typography variant="h1" sx={{ color: "#fff", fontSize: "12rem" }}>
            Noteify AI
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ color: "#fff" }}>
          You need to sign in to view this page
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Button
            color="inherit"
            sx={{
              variant: "contained",
              p: "10px 40px 10px 40px",
              mr: 3,
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
            href="/sign-in"
          >
            Login
          </Button>
          <Button
            color="inherit"
            sx={{
              variant: "contained",
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
            href="/sign-up"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name for the flashcard set");
      return;
    }

    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(db, "users", user.id);
    const flashcardSetDocRef = doc(
      collection(userDocRef, "flashcard_sets"),
      name
    );
    const docSnap = await getDoc(flashcardSetDocRef);

    if (docSnap.exists()) {
      alert("A flashcard set with this name already exists");
      return;
    } else {
      batch.set(flashcardSetDocRef, { name, flashcards });
    }

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Container
      maxWidth="false"
      sx={{ bgcolor: "#020303", maxWidth: "100%", height: "100vh" }}
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

      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#fff",
            mb: 3,
          }}
        >
          Generate Flashcards
        </Typography>
        <Paper
          sx={{ pt: 4, width: "100%", p: 2, bgcolor: "#030302", color: "#fff" }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            InputLabelProps={{
              style: {
                color: "#fff",
              },
            }}
            variant="outlined"
            inputProps={{
              style: {
                color: "#fff",
              },
            }}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2, bgcolor: "#0A0A0A", color: "#fff" }}
          />
          <Button
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            fullWidth
            sx={{
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
            Submit
          </Button>
        </Paper>
      </Box>
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent
                      sx={{
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
                          backgroundColor: "#f5f5f5",
                        },
                        "& > div > div:nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography variant="h6" align="center">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h6" align="center">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for the flashcard set
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

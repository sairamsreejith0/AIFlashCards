"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Container, Grid, Typography } from "@mui/material";
import Flashcard from "../components/flashcard";
import "../../app/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const sampleFlashcards = [
  {
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces.",
  },
  {
    question: "What is Next.js?",
    answer: "A React framework for building web applications.",
  },
  { question: "What is Material-UI?", answer: "A popular React UI framework." },
  { question: "What is Material-UI?", answer: "A popular React UI framework." },
];

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Handle the send action here, e.g., send the message to an API or log it
    console.log("Message sent:", message);
    setMessage(""); // Clear the text area after sending
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically if you want
          gap: 2, // Add space between elements
          margin: 'auto', // Center container horizontally
          width: '50%', // Set width of container
          maxWidth: '600px', // Optional: Set max width for responsiveness
          marginTop: 4, // Add margin-top for spacing
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter a topic or keyword to generate flashcards..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white", // Set text color to white
              "& fieldset": {
                borderColor: "white", // Set border color here
              },
              "&:hover fieldset": {
                borderColor: "white", // Set border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Set border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // Ensures text input is white
            },
          }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSend}
          sx={{ height: "fit-content", marginTop: 2 }} // Add margin-top for spacing
        >
          Generate
        </Button>
      </Box>

      <Container>
        <Typography variant="h4" component="h1" sx={{ marginTop: 4 }} gutterBottom>
          Flashcards
        </Typography>
        <Grid container spacing={2}>
          {sampleFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Flashcard
                question={flashcard.question}
                answer={flashcard.answer}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

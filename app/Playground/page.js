// Playground/page.js
"use client";
import React, { useState } from "react";
import axios from 'axios'; // AXIOS - a library for making http requests
import { TextField, Button, Box, Container, Grid, Typography } from "@mui/material";
import Flashcard from "../components/flashcard";
import "../../app/globals.css";
import { saveFlashcards } from '../utils/api'; // Ensure correct path
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from "firebase/auth"; // Firebase auth methods
import { auth } from '../../config'; // Import your initialized Firebase services
import Loading from "../components/loading";
import { useRouter } from "next/navigation";
export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [qaPairs, setQaPairs] = useState([]); // Stores an array of question-answer pairs
  const [loading, setLoading] = useState(false); // Loading state
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();

 
  const handleSend = async () => {
    if (!message.trim()) return; // Prevents sending if the input is empty or only spaces.

    setLoading(true); // Start loading

    try {
      setTitle(message);
      const response = await axios.post('/api/chat', { message: message });
      setQaPairs(response.data.qaPairs); // Update state with the array of Q&A pairs

    } catch (error) {
      console.error('Error generating questions and answers:', error);
    } finally {
      setLoading(false); // Stop loading
      setMessage(''); // Clears the input field after the request is completed.
    }
  };

  const handleSave = async () => {
    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      setSaving(true);

      // Fetch Firebase token using Clerk
      const firebaseToken = await getToken({ template: 'integration_firebase' });
      console.log("Firebase Token Retrieved:", firebaseToken);

      // Sign in with Firebase using the token
      await signInWithCustomToken(auth, firebaseToken);
      console.log("Signed in with Firebase");

      // Now proceed to save the flashcards
      await saveFlashcards(userId, qaPairs, title);
      console.log('Flashcards saved successfully');
    } catch (error) {
      console.error('Error saving flashcards:', error);
    }finally{
      router.push('/Dashboard/myCollection');
      setSaving(false);
      
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          margin: 'auto',
          width: '50%',
          maxWidth: '600px',
          marginTop: 4,
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
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSend}
          sx={{ height: "fit-content", marginTop: 2, backgroundColor: '#535C91', '&:hover': {
      backgroundColor: '#2E236C'} }} // Add margin-top for spacing
        >
          Generate
        </Button>
      </Box>
      {loading && (<Loading msg="Generating questions..."/>
      )}
       {saving && (<Loading msg="Saving flashcards..." />)}


      {!loading && !saving && (
        <Container>
          <Typography variant="h4" component="h1" sx={{ marginTop: 4 }} gutterBottom>
            Flashcards
          </Typography>
          <Grid container spacing={2}>
            {qaPairs.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Flashcard
                  question={flashcard.question}
                  answer={flashcard.answer}
                />
              </Grid>
            ))}
          </Grid>
          {qaPairs.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ height: "fit-content" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
          )};
        </Container>
      )};
    </>
  );
}

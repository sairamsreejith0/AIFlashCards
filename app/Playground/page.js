// Playground/page.js
"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import { TextField, Button, Box, Container, Grid, Typography } from "@mui/material";
import Flashcard from "../components/flashcard";
import "../../app/globals.css";
import { saveFlashcards } from '../utils/api';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from "firebase/auth";
import { auth, db } from '../../config';
import Loading from "../components/loading";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CustomAlert from '../../app/components/customAlert'  // Import the custom alert

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [qaPairs, setQaPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const [openAlert, setOpenAlert] = useState(false); // State to control the alert dialog
  const router = useRouter();
  const { userId, getToken } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchCounter();
    }
  }, [userId]);

  const fetchCounter = async () => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUsageCount(userData.generateCount || 0);
    } else {
      await setDoc(userDocRef, { generateCount: 0 });
      setUsageCount(0);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    if (usageCount >= 2) {
      setOpenAlert(true); // Open the alert dialog
      setLoading(false);
      return;
    }

    try {
      setTitle(message);
      const response = await axios.post('/api/chat', { message });
      setQaPairs(response.data.qaPairs);

      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { generateCount: usageCount + 1 }, { merge: true });
      setUsageCount(usageCount + 1);
    } catch (error) {
      console.error('Error generating questions and answers:', error);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const handleSave = async () => {
    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      setSaving(true);

      const firebaseToken = await getToken({ template: 'integration_firebase' });
      await signInWithCustomToken(auth, firebaseToken);

      await saveFlashcards(userId, qaPairs, title);
      router.push('/Dashboard/myCollection');
    } catch (error) {
      console.error('Error saving flashcards:', error);
    } finally {
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
          sx={{ height: "fit-content", marginTop: 2, backgroundColor: '#535C91', '&:hover': { backgroundColor: '#2E236C' } }}
        >
          Generate
        </Button>
      </Box>

      {loading && <Loading msg="Generating questions..." />}
      {saving && <Loading msg="Saving flashcards..." />}

      {!loading && !saving && (
        <Container>
          <Typography color='white' variant="h4" component="h1" sx={{ marginTop: 4 }} gutterBottom>
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
                className="gradient-button"
                variant="contained"
                color="success"
                sx={{ height: "fit-content" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          )}
        </Container>
      )}

      {/* Custom Alert Box */}
      <CustomAlert
        open={openAlert}
        onClose={() => setOpenAlert(false)} // Close the alert dialog
      />
    </>
  );
}

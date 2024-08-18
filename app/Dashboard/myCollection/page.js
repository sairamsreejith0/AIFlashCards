"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import CompactFlashcard from "../../components/CompactCard";
import { db } from "../../../config"; // Import your Firestore config
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import Flashcard from "@/app/components/flashcard";
import "../../../app/globals.css";
import SearchBar from "../../components/Search";

const FlashcardCollection = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null); // State to hold selected collection
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const { userId } = useAuth(); // Get the logged-in user's ID from Clerk

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!userId) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching flashcards for user: ${userId}`);

        const flashcardsCollection = collection(
          db,
          "users",
          userId,
          "flashcardCollections"
        );
        const flashcardsSnapshot = await getDocs(flashcardsCollection);

        let flashcardsList = flashcardsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        setFlashcards(flashcardsList);
        setLoading(false);
        console.log("Flashcards fetched:", flashcardsList);
      } catch (error) {
        console.error("Error fetching flashcards: ", error);
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [userId]);

  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection); // Set the selected collection
  };

  const handleDelete = async () => {
    if (!selectedCollection) return;

    try {
      const collectionDocRef = doc(
        db,
        "users",
        userId,
        "flashcardCollections",
        selectedCollection.id
      );
      await deleteDoc(collectionDocRef);

      // Remove the deleted collection from the state
      setFlashcards((prevFlashcards) =>
        prevFlashcards.filter((flashcard) => flashcard.id !== selectedCollection.id)
      );

      // Reset the selected collection
      setSelectedCollection(null);

      console.log("Flashcard collection deleted successfully");
    } catch (error) {
      console.error("Error deleting flashcard collection: ", error);
    }
  };

  const handleBackClick = () => {
    setSelectedCollection(null); // Go back to the collection view
  };

  const filteredItems = flashcards.filter((item) =>
    item.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading flashcards...
      </Typography>
    );
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginTop: 4, textAlign: "center", color: "white" }}
        gutterBottom
      >
        {selectedCollection ? selectedCollection.title : "Flashcard Collection"}
      </Typography>

      {/* Centered Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <SearchBar onHandleChange={handleChange} />
      </Box>

      {selectedCollection ? (
        <div>
          <Box sx={{ display: "flex", marginLeft: 2, gap: 2 }}>
            <Button onClick={handleBackClick}  className="gradient-button">
              Back to Collections
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                color: "white",
                bgcolor: "red", // Make the button background red
                "&:hover": {
                  bgcolor: "darkred", // Darken the button on hover for a better user experience
                },
              }}
            >
              Delete
            </Button>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {selectedCollection.cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Flashcard question={card.question} answer={card.answer} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredItems.length > 0 ? (
            filteredItems.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CompactFlashcard
                  title={flashcard.title}
                  onClick={() => handleCollectionClick(flashcard)} // Pass the click handler
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center">
              No flashcards found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default FlashcardCollection;

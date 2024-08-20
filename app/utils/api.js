// utils/api.js
import axios from 'axios';
export const saveFlashcards = async (userId,flashcards, title) => {
  try {
    // console.log("in api");
    const response = await axios.post('/api/saveFlashcards', {
        userId,
      flashcards,
      title,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving flashcards:', error);
    throw error;
  }
};

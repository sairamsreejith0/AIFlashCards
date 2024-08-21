import { db } from '../../../config'; // Import your Firebase setup
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function POST(req) {
  try {
    const { userId, flashcards, title } = await req.json(); // Parse the JSON body

    if (!userId) {
      return new Response('User not authenticated', { status: 401 });
    }
// console.log("in route");
    // Create a document reference for the user in the 'users' collection
    const userDocRef = doc(db, 'users', userId);

    // Create a collection reference for the flashcards within the user's document
    const flashcardCollectionRef = collection(userDocRef, 'flashcardCollections');
    // console.log("in route2");
    // Add a new document to the 'flashcardCollections' subcollection
    const newFlashcardDocRef = doc(flashcardCollectionRef);
    await setDoc(newFlashcardDocRef, {
      title: title || 'Untitled Collection',
      created_at: serverTimestamp(),
      cards: flashcards,
    });

    return new Response(JSON.stringify({ message: 'User and flashcards saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving user and flashcards:', error);
    return new Response(JSON.stringify({ error: 'Failed to save user and flashcards' }), { status: 500 });
  }
}

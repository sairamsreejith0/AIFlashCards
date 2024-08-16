// app/page.js
'use client'; 

import { useState } from 'react'; 
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material'; 
import axios from 'axios'; // AXIOS -  a library for making http requests

export default function Home() {
  const [input, setInput] = useState('');
  // const [messages, setMessages] = useState([]); 
  const [qaPairs, setQaPairs] = useState([]); // Stores an array of question-answer pairs

  const handleSend = async () => {
    if (!input.trim()) return; // Prevents sending if the input is empty or only spaces.

    try {
      const response = await axios.post('/api/chat', { message: input });
      // Sends a POST request to the '/api/chat' endpoint with the user's message.

      // setMessages([...messages, { text: input, user: 'me' }, { text: response.data.reply, user: 'ai' }]);
      // Updates the messages state with the user's input and the AI's reply.
      setQaPairs(response.data.qaPairs); // Update state with the array of Q&A pairs

    } catch (error) {
      // console.error('Error sending message:', error);// Logs any errors that occur during the HTTP request.
      console.error('Error generating questions and answers:', error);
    } finally {
      setInput(''); // Clears the input field after the request is completed.
    }
  };

  return (
    <Container>
      <List>
        {/* {messages.map((msg, index) => ( // iterates over each message in the messages array.
          <ListItem key={index}>  
            <ListItemText primary={msg.text} secondary={msg.user === 'me' ? 'You' : 'AI'} /> */}
            {/* primary: Displays the text of the message, secondary: Conditionally sets the secondary text to "You" if the message is from the user otherwise sets it to "AI".*/}
            {qaPairs.map((pair, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Q: ${pair.question}`} secondary={`A: ${pair.answer}`} />
          </ListItem>
        ))}
      </List>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} fullWidth />
      {/* Controlled input field for user text entry, updating state on change */}
      <Button onClick={handleSend} variant="contained" color="primary">Send</Button>
      {/* Button that triggers the handleSend function to send the message */}
    </Container>
  );
}

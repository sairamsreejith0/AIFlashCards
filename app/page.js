'use client';

import { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post('/api/chat', { message: input });
      setMessages([...messages, { text: input, user: 'me' }, { text: response.data.reply, user: 'ai' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setInput('');
    }
  };

  return (
    <Container>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.text} secondary={msg.user === 'me' ? 'You' : 'AI'} />
          </ListItem>
        ))}
      </List>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} fullWidth />
      <Button onClick={handleSend} variant="contained" color="primary">Send</Button>
    </Container>
  );
}

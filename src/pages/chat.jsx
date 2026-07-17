import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    alert("Message Sent: " + message);
    setMessage("");
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Group Chat
          </Typography>

          <TextField
            fullWidth
            label="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Paper>
      </Container>

      <Footer />
    </>
  );
}

export default Chat;
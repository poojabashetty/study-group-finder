import { useState } from "react";
import Navbar from "../components/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [members, setMembers] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = async () => {
  try {
    await addDoc(collection(db, "groups"), {
  title: groupName,
  subject: subject,
  location: location,
  members: Number(members),
  description: description,
  joinedUsers: [],
  createdAt: new Date(),
});
    alert("Group Created Successfully!");

    // Clear the form
    setGroupName("");
    setSubject("");
    setLocation("");
    setMembers("");
    setDescription("");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Create Study Group
          </Typography>

          <TextField
            fullWidth
            label="Group Name"
            margin="normal"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Subject"
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Location"
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Maximum Members"
            margin="normal"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleCreateGroup}
          >
            Create Group
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default CreateGroup;
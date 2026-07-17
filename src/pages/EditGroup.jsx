import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import Navbar from "../components/Navbar";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [members, setMembers] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchGroup();
  }, []);

  const fetchGroup = async () => {
    try {
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setGroupName(data.title);
        setSubject(data.subject);
        setLocation(data.location);
        setMembers(data.members);
        setDescription(data.description);
      } else {
        alert("Group not found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateGroup = async () => {
    if (
      !groupName ||
      !subject ||
      !location ||
      !members ||
      !description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const groupRef = doc(db, "groups", id);

      await updateDoc(groupRef, {
        title: groupName,
        subject: subject,
        location: location,
        members: Number(members),
        description: description,
      });

      alert("Group updated successfully!");

      navigate(`/group/${id}`);
    } catch (error) {
      console.log(error);
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
            Edit Study Group
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
            onClick={handleUpdateGroup}
          >
            Update Group
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default EditGroup;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import Navbar from "../components/Navbar";

import {
  Container,
  Paper,
  Typography,
  Button,
} from "@mui/material";

function GroupDetails() {
  const { id } = useParams();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetchGroup();
  }, []);

  const fetchGroup = async () => {
    try {
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGroup({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        alert("Group not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinGroup = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const groupRef = doc(db, "groups", id);

      await updateDoc(groupRef, {
        joinedUsers: arrayUnion(user.uid),
      });

      alert("Successfully joined the group!");

      fetchGroup();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  if (!group) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 5 }}>
          <Typography>Loading...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>

          <Typography
            variant="h4"
            gutterBottom
          >
            {group.title}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Subject:</b> {group.subject}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Members:</b> {group.members}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Location:</b> {group.location}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <b>Description:</b>
          </Typography>

          <Typography color="text.secondary">
            {group.description}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleJoinGroup}
          >
            Join Group
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            component={Link}
            to={`/group/${id}/edit`}
          >
            Edit Group
          </Button>

        </Paper>
      </Container>
    </>
  );
}

export default GroupDetails;
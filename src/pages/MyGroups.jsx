import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../components/Navbar";
import GroupCard from "../components/GroupCard";

import {
  Container,
  Typography,
  Stack,
} from "@mui/material";

function MyGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const fetchMyGroups = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "groups"));

      const myGroups = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (
          data.joinedUsers &&
          data.joinedUsers.includes(user.uid)
        ) {
          myGroups.push({
            id: doc.id,
            ...data,
          });
        }
      });

      setGroups(myGroups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          📚 My Groups
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))
          ) : (
            <Typography>
              You haven't joined any groups yet.
            </Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default MyGroups;
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import Navbar from "../components/Navbar";
import GroupCard from "../components/GroupCard";

import {
  Container,
  Typography,
  Stack,
} from "@mui/material";

function Groups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "groups"));

      const groupList = [];

      querySnapshot.forEach((doc) => {
        groupList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setGroups(groupList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >
          Study Groups
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: 4 }}
        >
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))
          ) : (
            <Typography>No study groups found.</Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default Groups;
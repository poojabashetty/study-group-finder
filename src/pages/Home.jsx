import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import GroupCard from "../components/GroupCard";

import {
  Button,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Home() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

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
      console.error(error);
    }
  };

  const filteredGroups = groups.filter((group) => {
    const title = (group.title || "").toLowerCase();
    const subject = (group.subject || "").toLowerCase();
    const location = (group.location || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      title.includes(searchText) ||
      subject.includes(searchText) ||
      location.includes(searchText)
    );
  });

  return (
    <>
      <Navbar />

      <Container sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h2" fontWeight="bold">
          📚 Find Your Perfect Study Group
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          Connect with students, learn together, and achieve your academic
          goals.
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/groups"
          >
            Search Groups
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/create-group"
          >
            Create Group
          </Button>
        </Stack>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Typography
          variant="h4"
          sx={{ mt: 6, mb: 4, fontWeight: "bold" }}
        >
          Popular Study Groups
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))
          ) : (
            <Typography sx={{ mt: 3 }}>
              No study groups found.
            </Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default Home;
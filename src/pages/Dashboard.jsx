import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Container,
  Paper,
  Typography,
} from "@mui/material";

function Dashboard() {
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Typography>
            Welcome to your Study Group Finder dashboard.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Here you can:
          </Typography>

          <ul>
            <li>Create Groups</li>
            <li>Join Groups</li>
            <li>Chat with Members</li>
            <li>Manage Your Profile</li>
          </ul>
        </Paper>
      </Container>

      <Footer />
    </>
  );
}

export default Dashboard;
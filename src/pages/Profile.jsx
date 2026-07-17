import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { auth } from "../firebase/firebase";

function Profile() {
  const user = auth.currentUser;

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Email:
          </Typography>

          <Typography color="text.secondary">
            {user ? user.email : "Not Logged In"}
          </Typography>
        </Paper>
      </Container>

      <Footer />
    </>
  );
}

export default Profile;
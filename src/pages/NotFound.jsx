import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
} from "@mui/material";

function NotFound() {
  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h1">
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </Container>
  );
}

export default NotFound;
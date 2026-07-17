import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function GroupCard({ group }) {
  return (
    <Card sx={{ width: 300, m: 2 }}>
      <CardContent>

        <Typography variant="h5">
          {group.title}
        </Typography>

        <Typography color="text.secondary">
          Subject: {group.subject}
        </Typography>

        <Typography>
          Members: {group.members}
        </Typography>

        <Typography>
          Location: {group.location}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          component={Link}
          to={`/group/${group.id}`}
        >
          Join Group
        </Button>

      </CardContent>
    </Card>
  );
}

export default GroupCard;
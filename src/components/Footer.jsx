import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 2,
        bgcolor: "#1976d2",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2026 Study Group Finder. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
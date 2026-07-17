import { TextField, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ search, setSearch }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ mt: 5 }}
    >
      <TextField
        label="Search Study Groups"
        variant="outlined"
        sx={{ width: "450px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Stack>
  );
}

export default SearchBar;
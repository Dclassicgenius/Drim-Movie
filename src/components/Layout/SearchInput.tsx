import { FormControl, TextField, InputAdornment, Box } from "@mui/material";

import { FormEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";

type SearchInputProps = {
  handleSubmit: (e: FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (e: string) => any;
};

export function SearchInput({
  handleSubmit,
  searchQuery,
  setSearchQuery,
}: SearchInputProps) {
  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "5px" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ my: 1, px: 1 }}>
          <TextField
            id="search"
            type="search"
            placeholder="Search for a movie, tv show, person"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    type="submit"
                    onClick={handleSubmit}
                    sx={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white" }}
          />
        </FormControl>
      </form>
    </Box>
  );
}

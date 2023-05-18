import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";

type FilterChipsProps = {
  chips: string[] | undefined;
  handleChipClick: (chip: string) => void;
  selectedChips: string[];
};

export function FilterChips({
  chips,
  handleChipClick,
  selectedChips,
}: FilterChipsProps) {
  return (
    <>
      <Box sx={{ my: 1 }}>
        {chips &&
          chips.map((chip) => (
            <Chip
              sx={{ m: 0.5 }}
              size="small"
              key={chip}
              label={chip}
              onClick={() => handleChipClick(chip)}
              color={selectedChips.includes(chip) ? "primary" : "default"}
              variant={selectedChips.includes(chip) ? "filled" : "outlined"}
            />
          ))}
      </Box>
    </>
  );
}

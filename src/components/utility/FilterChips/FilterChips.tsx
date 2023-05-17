import { Box, Chip } from "@mui/material";
import { useState } from "react";

type FilterChipsProps = {
  chips: string[] | undefined;
};

export function FilterChips({ chips }: FilterChipsProps) {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (chip: string) => {
    setSelectedChips((prevSelectedChips) => {
      const chipIndex = prevSelectedChips.indexOf(chip);
      if (chipIndex === -1) {
        return [...prevSelectedChips, chip];
      } else {
        return prevSelectedChips.filter((prevChip) => prevChip !== chip);
      }
    });
  };
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

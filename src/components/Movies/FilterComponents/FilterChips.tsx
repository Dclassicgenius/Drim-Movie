import { Box, Chip } from "@mui/material";
import { Genres } from "../../Detail/MovieDetails/movieDetailType";
import { Certification } from "../../../hooks/FilterHooks/useCertifications";

type chips = {};

type FilterChipsProps = {
  chips: Genres[] | Certification[] | undefined;
  handleChipClick: (chip: string) => void;
  selectedChips: string[];
  disableChips?: boolean[];
};

function isGenre(value: chips): value is Genres {
  return typeof value === "object" && value && value.hasOwnProperty("name");
}

export function FilterChips({
  chips,
  handleChipClick,
  selectedChips,
  disableChips,
}: FilterChipsProps) {
  return (
    <Box sx={{ my: 1 }}>
      {chips &&
        chips.map((chip, index) => (
          <Chip
            sx={{ m: 0.5 }}
            size="small"
            key={index}
            label={isGenre(chip) ? chip.name : chip.certification}
            onClick={() =>
              handleChipClick(
                isGenre(chip) ? chip.id.toString() : chip.certification
              )
            }
            color={
              selectedChips.includes(
                isGenre(chip) ? chip.id.toString() : chip.certification
              )
                ? "primary"
                : "default"
            }
            variant={
              selectedChips.includes(
                isGenre(chip) ? chip.id.toString() : chip.certification
              )
                ? "filled"
                : "outlined"
            }
            disabled={disableChips && disableChips[index]}
          />
        ))}
    </Box>
  );
}

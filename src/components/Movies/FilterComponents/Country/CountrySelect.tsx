import { Autocomplete, TextField, Box } from "@mui/material";
import { CountryType, countries } from "./countries";
import { ChangeEvent } from "react";

type CountrySelectProps = {
  selectCountry: CountryType | null;
  handleSelectCountryChange: (
    event: ChangeEvent<{}>,
    newValue: CountryType | null
  ) => void;
};

export function CountrySelect({
  selectCountry,
  handleSelectCountryChange,
}: CountrySelectProps) {
  return (
    <Autocomplete
      id="country-select-demo"
      options={countries}
      autoHighlight
      value={selectCountry}
      onChange={handleSelectCountryChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 1, flexShrink: 0, width: 12 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="12"
            src={`https://flagcdn.com/w12/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          value={selectCountry?.label || ""}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}

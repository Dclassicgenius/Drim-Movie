import { Autocomplete, TextField, Box } from "@mui/material";
import { CountryType, countries } from "./countries";
import { ChangeEvent, SetStateAction, useState } from "react";

export default function CountrySelect() {
  const [selectCountry, setSelectCountry] = useState<CountryType | null>(
    countries.find((country) => country.code === "US") ?? null
  );

  return (
    <Autocomplete
      id="country-select-demo"
      options={countries}
      autoHighlight
      value={selectCountry}
      onChange={(event: ChangeEvent<{}>, newValue: CountryType | null) => {
        setSelectCountry(newValue);
      }}
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

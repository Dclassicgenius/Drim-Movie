import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useContext } from "react";
import classNames from "classnames";
import { FilterContext } from "../Context/FilterContext";

const availabilities = [
  { value: "Flatrate", label: "Stream" },
  { value: "Free", label: "Free" },
  { value: "Ads", label: "Ads" },
  { value: "Rent", label: "Rent" },
  { value: "Buy", label: "Buy" },
];

export const AvailabilityFilter = () => {
  const filterState = useContext(FilterContext);

  if (!filterState) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const {
    availabilityFilter,
    handleAvailabiltyChange,
    checkedAvailabilityAll,
    handleAvailabilityAllChange,
  } = filterState;

  return (
    <section className="[@media(min-width:600px)]:px-4 py-3 px-10">
      <h2 className=" font-light text-grey-500 text-sm ">Availabilities</h2>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedAvailabilityAll}
              onChange={handleAvailabilityAllChange}
            />
          }
          label="Search all availabilities"
        />
      </Box>
      <div className={classNames(checkedAvailabilityAll ? "hidden" : "block")}>
        <Box sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {availabilities.map((availability) => (
                <FormControlLabel
                  key={availability.value}
                  control={
                    <Checkbox
                      checked={availabilityFilter.includes(
                        availability.value.toLowerCase()
                      )}
                      value={availability.value.toLowerCase()}
                      onChange={handleAvailabiltyChange}
                    />
                  }
                  label={availability.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </div>
    </section>
  );
};

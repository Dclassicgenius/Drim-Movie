import { Box, Typography } from "@mui/material";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type DateSelectorProps = {
  releaseDateStart: Dayjs | null;
  releaseDateEnd: Dayjs | null;
  handleReleaseDateStart: (newValue: Dayjs | null) => void;
  handleReleaseDateEnd: (newValue: Dayjs | null) => void;
};

export const DateSelector = ({
  releaseDateStart,
  releaseDateEnd,
  handleReleaseDateStart,
  handleReleaseDateEnd,
}: DateSelectorProps) => {
  const handleError = (error: DateValidationError, value: Dayjs | null) => {};
  return (
    <div>
      {" "}
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <Typography sx={{ color: "grey.500", marginRight: 1 }}>
              from
            </Typography>
            <DatePicker
              label="Pick a date"
              value={releaseDateStart}
              onChange={handleReleaseDateStart}
              maxDate={releaseDateEnd as Dayjs | undefined}
              onError={handleError}
              slotProps={{
                textField: {
                  helperText: "",
                  error: false,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <Typography sx={{ color: "grey.500", marginRight: 1 }}>
              to
            </Typography>
            <Box>
              <DatePicker
                label="Pick a date"
                value={releaseDateEnd}
                onChange={handleReleaseDateEnd}
                minDate={releaseDateStart as Dayjs | undefined}
                onError={handleError}
                slotProps={{
                  textField: {
                    helperText: "",
                    error: false,
                  },
                }}
              />
            </Box>
          </Box>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

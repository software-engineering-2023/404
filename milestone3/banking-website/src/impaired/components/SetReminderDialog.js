import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../themes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { setReminder } from "../../store";
import { useSpeechSynthesis } from 'react-speech-kit';


const SetReminderDialog = ({ id, type }) => {
  const { speak , cancel } = useSpeechSynthesis();
  const speakText = (text) => {
    speak({ text });
  };
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const handleDateChange = (value) => {
    setDate(value);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (date) {
      const message = `We are reminding you that your ${type} is due on ${date.format(
        "YYYY-MM-DD"
      )}`;
      dispatch(
        setReminder({
          message: message,
          date: date.format(
            "YYYY-MM-DD"
          ),
        })
      );
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        size="small"
        style={{ margin: 2 }}
        onClick={handleClick}
        onMouseLeave={() => cancel()} 
        onMouseEnter={() => {speakText('Set Reminder Button , Press enter to set a reminder' )}}
      >
        Set Reminder
      </Button>
      <Dialog 
      onMouseLeave={() => cancel()} 
      onMouseEnter={() => {speakText('Set Reminder Pop Up')}}
      onClose={handleClose} open={open} maxWidth="md">
        <DialogTitle>Set Reminder</DialogTitle>
        <Box sx={{ margin: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
                onMouseLeave={() => cancel()} 
                onMouseEnter={() => {speakText('Date Picker, Press to choose the date' )}}
            >
              <DatePicker
                value={date}
                onChange={handleDateChange}
                label="Date of the Reminder"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </Box>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="small"
          style={{ margin: "10px" }}
          onClick={handleClose}
          onMouseLeave={() => cancel()} 
          onMouseEnter={() => {speakText('Set Button , Please Press to set the reminder' )}}
        >
          Set
        </Button>
      </Dialog>
    </Box>
  );
};

export default SetReminderDialog;

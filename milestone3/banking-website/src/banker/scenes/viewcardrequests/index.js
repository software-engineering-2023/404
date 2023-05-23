import { Box, useTheme, Button , IconButton } from "@mui/material";
import Header from "../../components/Header";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import SearchIcon from "@mui/icons-material/Search";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../themes";
import { seriesCharacters } from "../../../data/mockdata";

const ViewCardRequests = () => {
  const [searchTerm , setSearchTerms] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const onChange = (event) => {
    setSearchTerms(event.target.value);
  };
  const filteredArray = seriesCharacters.filter((driver) => {
    return driver.bankAccount.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const mappedArray = filteredArray.map((character)=>{
    return (
        <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h3">
            {character.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="h5" color={colors.grey[100]}>
            {`Bank Account ID: ${character.bankAccount}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Card Requested: ${character.cardRequestedType}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Total Bank Balance: ${character.totalBankBalance}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Email: ${character.email}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Phone Number: ${character.phoneNumber}`}
          </Typography>

        </AccordionDetails>
        <Box display="flex" justifyContent="end" mt="20px" m = "10px">
            <Box m = "5px">
            <Button type="submit" color="secondary" variant="contained">
                Accept
              </Button>
            </Box>
            <Box m = "5px">
            <Button type="submit" color="error" variant="contained">
                Reject
              </Button>
            </Box>
        </Box>
      </Accordion>
    );
  });
  return (
    <Box m="20px">
      <Header title="Cards Requests" subtitle="View Customers' Card Requests and Deal with them" />
      <Box display="flex" 
        backgroundColor = {colors.primary[400]}
         borderRadius="3px"
         m = "4px 0px 20px 0px"
         >
            <InputBase value={searchTerm} onChange={onChange} sx ={{ml:2 , flex:1}} placeHolder = "Search" />
            <IconButton type = "button" sx={{p:1}}>
                <SearchIcon />
            </IconButton>
            {/* <Typography variant="h3" color={colors.grey[100]}>
                    The GUC Bank Banker's Admin Panel
              </Typography> */}
         </Box>
      {mappedArray}
    </Box>
  );
};

export default ViewCardRequests;
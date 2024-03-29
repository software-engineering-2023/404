import {Box , IconButton , useTheme , Typography} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext , tokens } from "../../themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

function TopBar(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (<Box display = "flex" justifyContent="space-between" p={2}>
        <Box display="flex" 
        // backgroundColor = {colors.primary[400]}
         borderRadius="3px"
         >
            {/* <InputBase sx ={{ml:2 , flex:1}} placeHolder = "Search" />
            <IconButton type = "button" sx={{p:1}}>
                <SearchIcon />
            </IconButton> */}
         </Box>
         <Box display="flex">
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> */}
          <Link to='/sign-in'>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Link>
         </Box>
    </Box>);
}
export default TopBar;
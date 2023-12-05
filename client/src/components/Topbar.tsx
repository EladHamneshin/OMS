import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExitToApp, Person, PersonAdd } from '@mui/icons-material';
import '../pages/style/navBarStyle.css';
import SearchIcon from "@mui/icons-material/Search";
import { TopbarProps } from "../types/Props";
import NavBar from "../pages/navBar";


const Topbar: React.FC<TopbarProps> = ({ setIsSidebar }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [value, setValue] = React.useState('recents');

    const handleChange = (_event: React.SyntheticEvent<Element>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    borderRadius: "3px",
                }}
            >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">

                <BottomNavigation value={value} onChange={handleChange}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>
                    <BottomNavigationAction
                        className='button'
                        component={Link}
                        to="/login"
                        label="Sign In"
                        value="sign in"
                        icon={<Person />}
                    />
                    <BottomNavigationAction
                        className='button'
                        component={Link}
                        to="/register"
                        label="Sign Up"
                        value="sign up"
                        icon={<PersonAdd />}
                    />
                    <BottomNavigationAction
                        className='button'
                        component={Link}
                        to="/orders"
                        label="Orders"
                        value="orders"
                        icon={<ShoppingCart />}
                    />
                    <BottomNavigationAction
                        className='button'
                        component={Link}
                        to="/logout"
                        label="Logout"
                        value="logout"
                        icon={<ExitToApp />}
                    />
                </BottomNavigation>
            </Box>
        </Box>
    );
};

export default Topbar;
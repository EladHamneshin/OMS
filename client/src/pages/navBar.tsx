import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import {
    Dashboard,
    ExitToApp,
    Person,
    PersonAdd,
    DarkModeOutlined,
    LightModeOutlined
} from '@mui/icons-material';
import './style/navBarStyle.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useContext } from 'react';
import { UserContext } from "../userContext";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../theme/theme';

export default function NavBar() {
    const userContext = useContext(UserContext);
    const [value, setValue] = React.useState('recents');

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const handleChange = (_event: React.SyntheticEvent<Element>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <BottomNavigation color={colors.grey[400]}
                sx={{ width: 350 }}
                value={value}
                onChange={handleChange} className='nav'>
                <IconButton
                    className='button'
                    onClick={colorMode!.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{ color: colors.grey[100] }} />
                    ) : (
                        <LightModeOutlined />
                    )}
                </IconButton>
                {userContext?.userInfo ? (
                    [
                        <BottomNavigationAction
                            sx={{
                                color: colors.grey[100],

                            }}
                            key="dashboard"
                            className='button'
                            component={Link}
                            to="/oms/dashboard"
                            label={<Typography
                                sx={{
                                    fontSize: "11px",
                                    color: colors.grey[300]
                                }}
                            >Dashboard</Typography>}
                            value="dashboard"
                            icon={<Dashboard sx={{ color: colors.grey[100] }} />}
                        ></BottomNavigationAction>,
                        <BottomNavigationAction
                            key="users"
                            className='button'
                            component={Link}
                            to="/oms/users"
                            label={<Typography
                                sx={{
                                    fontSize: "11px",
                                    color: colors.grey[300]
                                }}
                            >Users</Typography>}
                            value="users"
                            icon={<PeopleAltIcon sx={{ color: colors.grey[100] }} />}
                        ></BottomNavigationAction>,
                        <BottomNavigationAction
                            key="logout"
                            className='button'
                            component={Link}
                            to="/oms/logout"
                            label={<Typography
                                sx={{
                                    fontSize: "11px",
                                    color: colors.grey[300]
                                }}
                            >Logout</Typography>}
                            value="logout"
                            icon={<ExitToApp sx={{ color: colors.grey[100] }} />}
                        ></BottomNavigationAction>,
                    ]
                ) : (
                    [
                        <BottomNavigationAction
                            key="signIn"
                            className='button'
                            component={Link}
                            to="/oms/login"
                            label={<Typography
                                sx={{
                                    fontSize: "11px",
                                    color: colors.grey[300]
                                }}
                            >Sign In</Typography>}
                            value="sign in"
                            icon={<Person sx={{ color: colors.grey[100] }} />}
                        ></BottomNavigationAction>,
                        <BottomNavigationAction
                            key="signUp"
                            className='button'
                            component={Link}
                            to="/oms/register"
                            label={<Typography
                                sx={{
                                    fontSize: "11px",
                                    color: colors.grey[300]
                                }}
                            >Sign Up</Typography>}
                            value="sign up"
                            icon={<PersonAdd sx={{ color: colors.grey[100] }} />}
                        ></BottomNavigationAction>,
                    ]
                )}
            </BottomNavigation>
        </Box>
    );
}

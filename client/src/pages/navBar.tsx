import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExitToApp, Person, PersonAdd } from '@mui/icons-material';
import './style/navBarStyle.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useContext } from 'react';
import { UserContext } from "../userContext";

export default function NavBar() {
    const userContext = useContext(UserContext);
    const [value, setValue] = React.useState('recents');

    const handleChange = (_event: React.SyntheticEvent<Element>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='navFather'>
            <BottomNavigation sx={{ width: 350 }} value={value} onChange={handleChange} className='nav'>
                {userContext?.userInfo ? (
                    [
                        <BottomNavigationAction
                            key="orders"
                            className='button'
                            component={Link}
                            to="/orders"
                            label="Orders"
                            value="orders"
                            icon={<ShoppingCart />}
                        />,
                        <BottomNavigationAction
                            key="users"
                            className='button'
                            component={Link}
                            to="/users"
                            label="Users"
                            value="users"
                            icon={<PeopleAltIcon />}
                        />,
                        <BottomNavigationAction
                            key="logout"
                            className='button'
                            component={Link}
                            to="/logout"
                            label="Logout"
                            value="logout"
                            icon={<ExitToApp />}
                        />,
                    ]
                ) : (
                    [
                        <BottomNavigationAction
                            key="signIn"
                            className='button'
                            component={Link}
                            to="/login"
                            label="Sign In"
                            value="sign in"
                            icon={<Person />}
                        />,
                        <BottomNavigationAction
                            key="signUp"
                            className='button'
                            component={Link}
                            to="/register"
                            label="Sign Up"
                            value="sign up"
                            icon={<PersonAdd />}
                        />,
                    ]
                )}
            </BottomNavigation>
        </div>
    );
}

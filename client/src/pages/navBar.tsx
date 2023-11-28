import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExitToApp, Person, PersonAdd } from '@mui/icons-material'
import './style/navBarStyle.css'


export default function NavBar() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='navFather'>
            <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange} className='nav'>
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
                    icon={<ExitToApp />} />
            </BottomNavigation>

        </div>
    );
}

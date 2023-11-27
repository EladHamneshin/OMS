// import React from "react";
import Button from '@mui/material/Button';
import { logOutApi } from "../api/usersAPI";

function Logout() {
    const handleClick = async () => {
        try {
            // Assuming you have a user object to pass to the API function
            // const user = /* your user object here */;
            await logOutApi();
            // Redirect or handle other logic after successful logout if needed
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (e.g., show an error message to the user)
        }
    }

    return (
        <>
            <Button onClick={handleClick} variant="contained">Logout</Button>
        </>
    );
}

export default Logout;

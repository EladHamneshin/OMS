import  { useContext } from "react";
import Button from '@mui/material/Button';
import   { UserContext }  from "../userContext"; // Update the path accordingly

function Logout() {
    const userContext = useContext(UserContext);

    const handleClick = async () => {
        try {
            await userContext?.logoutUser();
            console.log('hi');
            
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

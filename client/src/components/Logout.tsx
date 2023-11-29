import  { useContext } from "react";
import Button from '@mui/material/Button';
import   { UserContext }  from "../userContext"; // Update the path accordingly
import { useNavigate } from "react-router";

function Logout() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await userContext?.logoutUser();
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <>
            <Button onClick={handleClick} variant="contained">Logout</Button>
        </>
    );
}

export default Logout;

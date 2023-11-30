import  { useContext } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import   { UserContext }  from "../userContext"; // Update the path accordingly
function Logout() {
    const userContext = useContext(UserContext);
    const handleClick = async () => {
        try {
            await userContext?.logoutUser();
            // Redirect or handle other logic after successful logout if needed
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (e.g., show an error message to the user)
        }
    }
    return (
        <>
            {(userContext?.userInfo) ? (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            user info:
                        </Typography>
                        <Typography variant="h5" component="div">
                            {`name: ${ userContext?.userInfo.first_name}`},
                             {userContext?.userInfo.email}
                        </Typography>
                        {/* Additional user information can be displayed here */}
                    </CardContent>
                    <CardActions>
                         <Button onClick={handleClick} variant="contained">Logout</Button>
                    </CardActions>
                </Card>
            ) : (
                <Button onClick={handleClick} variant="contained">Logout</Button>
            )}
        </>
    );
}
export default Logout;
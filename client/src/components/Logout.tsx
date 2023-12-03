import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../userContext"; // Update the path accordingly
import { useNavigate } from "react-router-dom";

function Logout() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await userContext?.logoutUser();
            setTimeout(() => {
                // Redirect or handle other logic after successful logout if needed
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <>
            {userContext?.userInfo ? (
                <Card
                    style={{
                        minWidth: 275,
                        maxWidth: 400,
                        margin: "auto",
                        marginTop: 20,
                    }}
                >
                    <CardContent>
                        <Typography
                            style={{ fontSize: 30 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            User Info:
                        </Typography>
                        <Typography variant="h5" component="div">
                            {`First Name: ${userContext?.userInfo.first_name} ${userContext?.userInfo.last_name}`}
                        </Typography>
                        <Typography color="text.secondary" style={{ marginBottom: 12 }}>
                            Last Name: {userContext?.userInfo.last_name}
                        </Typography>
                        <Typography color="text.secondary" style={{ marginBottom: 12 }}>
                            Email: {userContext?.userInfo.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            style={{ marginTop: 10 }}
                        >
                            Logout
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Card>
                <Typography variant="h5" component="div" style={{ textAlign: "center", marginTop: 20 }}>
                    You are logged out
                </Typography></Card>
            )}
        </>
    );
}

export default Logout;

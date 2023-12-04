// import { useContext, useEffect, useState } from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { UserContext } from "../userContext";
// import { useNavigate } from "react-router-dom";

// function Logout() {
// 	const userContext = useContext(UserContext);
// 	const navigate = useNavigate();
// 	const [, setWasLoggedIn] = useState(false);

// 	useEffect(() => {
// 		if (!userContext?.userInfo) {
// 			// Show message for 2 seconds and then navigate to ("/")
// 			setTimeout(() => {
// 				navigate("/");
// 			}, 2000);
// 		}
// 	}, [userContext?.userInfo, navigate]);

// 	useEffect(() => {
// 		// Set wasLoggedIn when the component initially renders
// 		if (userContext?.userInfo) {
// 			setWasLoggedIn(true);
// 		}
// 	}, [userContext?.userInfo]);

// 	const handleClick = async () => {
// 		try {
// 			await userContext?.logoutUser();
// 		} catch (error) {
// 			console.error("Logout failed:", error);
// 		}
// 	};

// 	return (
// 		<>
// 			{!userContext?.userInfo ? (
// 				<h1>You are logged out already</h1>
// 			) : (
// 				<Card
// 					style={{
// 						minWidth: 275,
// 						maxWidth: 400,
// 						margin: "auto",
// 						marginTop: 20,
// 					}}
// 				>
// 					<CardContent>
// 						<Typography
// 							style={{ fontSize: 30 }}
// 							color="text.secondary"
// 							gutterBottom
// 						>
// 							User Info:
// 						</Typography>
// 						<Typography variant="h5" component="div">
// 							{`First Name: ${userContext?.userInfo.first_name} ${userContext?.userInfo.last_name}`}
// 						</Typography>
// 						<Typography color="text.secondary" style={{ marginBottom: 12 }}>
// 							Last Name: {userContext?.userInfo.last_name}
// 						</Typography>
// 						<Typography color="text.secondary" style={{ marginBottom: 12 }}>
// 							Email: {userContext?.userInfo.email}
// 						</Typography>
// 					</CardContent>
// 					<CardActions>
// 						<Button
// 							onClick={handleClick}
// 							variant="contained"
// 							style={{ marginTop: 10 }}
// 						>
// 							Logout
// 						</Button>
// 					</CardActions>
// 				</Card>
// 			)}
// 		</>
// 	);
// }

// export default Logout;
import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

function Logout() {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const [, setWasLoggedIn] = useState(false);

	useEffect(() => {
		if (!userContext?.userInfo) {
			// Show message for 2 seconds and then navigate to ("/")
			setTimeout(() => {
				navigate("/");
			}, 2000);
		}
	}, [userContext?.userInfo, navigate]);

	useEffect(() => {
		// Set wasLoggedIn when the component initially renders
		if (userContext?.userInfo) {
			setWasLoggedIn(true);
		}
	}, [userContext?.userInfo]);

	const handleClick = async () => {
		try {
			await userContext?.logoutUser();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<>
			{!userContext?.userInfo ? (
				<h1>You are logged out</h1>
			) : (
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
			)}
		</>
	);
}

export default Logout;

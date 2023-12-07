import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { AdminUser } from '../types/admin';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { ToastContainer } from 'react-toastify';

const defaultTheme = createTheme();
export default function SignIn() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    React.useEffect(() => {
        if (userContext?.userInfo) {
            setTimeout(() => {
                navigate('/oms/dashboard')
            }, 2000)
        }
    }, [userContext]);



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userEmail = formData.get('email') as string | undefined;
        const userPassword = formData.get('password') as string | undefined;
        if (userEmail !== undefined && userPassword !== undefined) {
            const user: Partial<AdminUser> = {
                email: userEmail,
                password: userPassword,
            };
            try {
                if (user.email !== undefined && user.password !== undefined) {
                    await userContext?.loginUser(user.email, user.password);
                    toastSuccess('Successful login');
                    navigate('/oms/dashboard');
                } else {
                    throw new Error('Email and password cannot be empty');
                }
            } catch (error) {
                toastError('Login failed. Please check your credentials.');
            }
        } else {
            console.error('Email or password is undefined');
        }
    };



    if (userContext?.userInfo) {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="form">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <h2>You are already logged in!</h2>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('oms/dashboard')}
                            >
                                Go to Orders
                            </Button>
                        </Box>
                    </Box>
                </div>
                <ToastContainer />
            </Container>
        );
    }



    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="form">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link
                                        to="oms/register"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {"Don't have an account? register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
}


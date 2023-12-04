import React, { useState, FormEvent } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validationUtils';
import { register } from '../api/usersAPI';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { Container, Avatar, Box, Grid, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from '../types/admin';
import './style/formStyle.css'



const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
    });
    const navigate = useNavigate();

    const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isValidEmail(event.target.value)) {
            setEmailError(true);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isValidEmail(event.target.value)) {
            setEmailError(false);
        }
        setFormData((prevData) => ({
            ...prevData,
            email: event.target.value,
        }));
    };

    const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isValidPassword(event.target.value)) {
            setPasswordError(true);
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isValidPassword(event.target.value)) {
            setPasswordError(false);
        }
        setFormData((prevData) => ({
            ...prevData,
            password: event.target.value,
        }));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            confirmPassword: event.target.value,
        }));
    };


    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            first_name: event.target.value,
        }));
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            last_name: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password, confirmPassword, first_name, last_name } = formData;

        if (password !== confirmPassword) {
            toastError('Passwords do not match');
            return;
        }

        if (!isValidEmail(email)) {
            toastError('Email must be a valid email');
            return;
        }

        if (!isValidPassword(password)) {
            toastError('Password must be a valid password');
            return;
        }

        try {
            setIsLoading(true);

            const data: AdminUser = {
                email,
                password,
                first_name,
                last_name,
                isAdmin: true
            }
            await register(data);

            setIsLoading(false);
            toastSuccess('Registration successful');
            navigate('/oms/login');
        } catch (err) {
            setIsLoading(false);
            toastError((err as Error).message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className='form2'>
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={handleEmailBlur}
                                    onChange={handleEmailChange}
                                    required
                                    fullWidth
                                    error={isEmailError}
                                    helperText={isEmailError ? 'Email must be a valid email address' : ''}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={handlePasswordBlur}
                                    onChange={handlePasswordChange}
                                    required
                                    fullWidth
                                    error={isPasswordError}
                                    helperText={
                                        isPasswordError
                                            ? 'Password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'
                                            : ''
                                    }
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    onChange={handleConfirmPasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="first_name"
                                    label="First Name"
                                    id="first_name"
                                    onChange={handleFirstNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="last_name"
                                    label="Last Name"
                                    id="last_name"
                                    onChange={handleLastNameChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>

                        {isLoading && <p>Loading...</p>}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={'/login'} variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </Container>
    );
};

export default SignUp;


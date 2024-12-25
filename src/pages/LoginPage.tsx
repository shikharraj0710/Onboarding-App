import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { Button, TextField, Container, Typography, Box, Paper, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from "../styles/LoginPage.module.css";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
            const { username, password } = values;
            if (username === "user123" && password === "password123") {
                setLoginError(null);
                dispatch(login({ username, password }));
                navigate("/onboarding");
            } else {
                setLoginError("Invalid username or password. Please try again.");
            }
        },
    });

    return (
        <div className={styles.login_wrapper}>
            <Container maxWidth="xs">
                <Paper elevation={4} className={styles.login_paper}>
                    <Box textAlign="center" marginBottom="1rem">
                        <Typography variant="h4" component="h1" color="primary">
                            Welcome Back
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Please login to your account
                        </Typography>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ marginTop: '1rem' }}
                        >
                            Login
                        </Button>
                        {loginError && (
                            <Box marginTop="1rem">
                                <Alert severity="error">{loginError}</Alert>
                            </Box>
                        )}
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;

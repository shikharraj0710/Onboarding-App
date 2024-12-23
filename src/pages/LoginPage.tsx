import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login({ username, password }));
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
            <Paper elevation={4} style={{ padding: '2rem', borderRadius: '10px' }}>
                <Box textAlign="center" marginBottom="1rem">
                    <Typography variant="h4" component="h1" color="primary">
                        Welcome Back
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Please login to your account
                    </Typography>
                </Box>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                </form>
                <Box textAlign="center" marginTop="1.5rem">
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account? <a href="#" style={{ color: '#3f51b5', textDecoration: 'none' }}>Sign Up</a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user); 

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/'); 
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                textAlign: 'center',
                padding: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>Welcome, {user.credentials?.username}!</Typography>
            <Typography variant="body1">
                You have successfully completed the onboarding process.
            </Typography>
            <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 2 }}>
                Logout
            </Button>
        </Box>
    );
};

export default Home;

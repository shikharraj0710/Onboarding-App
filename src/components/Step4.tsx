import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface Step4Props {
    onBack: () => void;
    onComplete: () => void;
}

const Step4: React.FC<Step4Props> = ({ onBack, onComplete }) => (
    <Box textAlign="center">
        <Typography variant="h4" gutterBottom>Onboarding Complete</Typography>
        <Typography variant="subtitle1">Thank you for completing the onboarding process.</Typography>
        <Button onClick={onComplete} variant="contained" color="primary">Go to Home</Button>

        <Box mt={2}>
            <Button type="button" onClick={onBack} variant="outlined">
                Back
            </Button>
        </Box>
    </Box>
);

export default Step4;

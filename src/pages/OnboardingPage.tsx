import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnboardingStep } from '../store/userSlice';
import { RootState } from '../store';
import { Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const steps = ['Welcome', 'Personal Info', 'Finish'];

const OnboardingPage: React.FC = () => {
    const dispatch = useDispatch();
    const step = useSelector((state: RootState) => state.user.onboardingStep);

    const handleNext = () => {
        if (step < steps.length - 1) {
            dispatch(setOnboardingStep(step + 1));
        }
    };

    const handleBack = () => {
        if (step > 0) {
            dispatch(setOnboardingStep(step - 1));
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
            >
                <Typography variant="h4" gutterBottom>{steps[step]}</Typography>
                <Button onClick={handleBack} disabled={step === 0}>Back</Button>
                <Button onClick={handleNext} disabled={step === steps.length - 1}>Next</Button>
            </motion.div>
        </Container>
    );
};

export default OnboardingPage;

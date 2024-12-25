import React from 'react';
import { Stepper, Step, StepLabel, Box, Container, Paper } from '@mui/material';

interface StepsLayoutProps {
    steps: string[];
    activeStep: number;
    children: React.ReactNode;
}

const StepsLayout: React.FC<StepsLayoutProps> = ({ steps, activeStep, children }) => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                        width: '100%',
                        marginBottom: 4,
                        '.MuiStepConnector-line': {
                            borderColor: '#1976d2',
                        },
                        '.MuiStepLabel-label.Mui-active': {
                            color: '#1976d2',
                        },
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={`${label}_${index}`}>
                            <StepLabel
                                sx={{
                                    '.MuiStepIcon-root.Mui-active': {
                                        color: '#1976d2',
                                    },
                                    '.MuiStepIcon-root.Mui-completed': {
                                        color: '#4caf50',
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        width: '100%',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </Container>
    );
};

export default StepsLayout;

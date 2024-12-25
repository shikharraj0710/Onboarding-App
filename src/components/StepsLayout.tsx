import React from 'react';
import { Stepper, Step, StepLabel, Box, Container, Paper, Typography } from '@mui/material';
import styles from "../styles/StepsLayout.module.css"

interface StepsLayoutProps {
    steps: string[];
    activeStep: number;
    children: React.ReactNode;
}

const StepsLayout: React.FC<StepsLayoutProps> = ({ steps, activeStep, children }) => {
    return (
        <div className={styles.wrapper}>
            <Container
            >
                <Box
                    className={styles.box}
                >
                    <Typography
                        variant="h3"
                        component="div"
                        gutterBottom
                        className={styles.typography}
                    >
                        Onboarding Process
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        className={styles.stepperContainer}
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
                                        '.MuiStepLabel-label': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Paper
                        elevation={4}
                        className={styles.paper}
                    >
                        {children}
                    </Paper>
                </Box>
            </Container>
        </div>

    );
};

export default StepsLayout;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setOnboardingStep, setFormData, loadFormDataFromLocalStorage } from '../store/userSlice';
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import StepsLayout from '../components/StepsLayout';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal Profile', 'Favorite Songs', 'Payment Info', 'Success'];

const OnboardingPage: React.FC = () => {
    const dispatch = useDispatch();
    const activeStep = useSelector((state: RootState) => state.user.onboardingStep);
    const formData = useSelector((state: RootState) => state.user.formData);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadFormDataFromLocalStorage());
    }, [dispatch]);

    const handleNext = (data: any) => {
        dispatch(setFormData(data));
        if (activeStep < steps.length - 1) {
            dispatch(setOnboardingStep(activeStep + 1));
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            dispatch(setOnboardingStep(activeStep - 1));
        }
    };

    const onCompleted = () => {
        navigate('/home');
    }

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <Step1 onNext={handleNext} initialValues={formData} />;
            case 1:
                return <Step2 onNext={handleNext} onBack={handleBack} initialValues={formData} />;
            case 2:
                return <Step3 onNext={handleNext} onBack={handleBack} initialValues={formData} />;
            case 3:
                return <Step4 onBack={handleBack} onComplete={onCompleted} />;
            default:
                return null;
        }
    };

    return (
        <StepsLayout steps={steps} activeStep={activeStep}>
            {renderStepContent()}
        </StepsLayout>
    );
};

export default OnboardingPage;

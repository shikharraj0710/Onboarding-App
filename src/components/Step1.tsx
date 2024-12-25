import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/userSlice';

interface Step1FormData {
    name: string;
    age: string;
    email: string;
    profilePicture?: File | string | null;
}

interface Step1Props {
    onNext: (data: Step1FormData) => void;
    initialValues: Step1FormData;
}

const Step1: React.FC<Step1Props> = ({ onNext, initialValues }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (initialValues.profilePicture) {
            setPreview(initialValues.profilePicture instanceof File
                ? URL.createObjectURL(initialValues.profilePicture)
                : initialValues.profilePicture);
        }
    }, [initialValues.profilePicture]);

    const formik = useFormik<Step1FormData>({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            age: Yup.number()
                .required('Age is required')
                .positive('Age must be a positive number')
                .integer('Age must be an integer'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            profilePicture: Yup.mixed()
                .test('fileSize', 'File size must be less than 2MB', (value) =>
                    value && value instanceof File ? value.size <= 2 * 1024 * 1024 : true
                )
                .required('Profile picture is required'),
        }),
        onSubmit: (values) => {
            const formData = {
                ...values,
                profilePicture: values.profilePicture instanceof File ? URL.createObjectURL(values.profilePicture) : values.profilePicture,
            };
            dispatch(setFormData(formData));
            onNext(values);
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            formik.setFieldValue('profilePicture', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Container maxWidth="sm" >
            <Box
                sx={{
                    p: 4,
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h5" gutterBottom textAlign="center">
                    Step 1: Personal Profile
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('name')}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        label="Age"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('age')}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Box textAlign="center" mt={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            Profile Picture
                        </Typography>
                        <label htmlFor="profile-picture-upload">
                            <input
                                id="profile-picture-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Button variant="outlined" component="span" color="primary">
                                Upload Picture
                            </Button>
                        </label>
                        {formik.errors.profilePicture && formik.touched.profilePicture && (
                            <Typography color="error" variant="caption" display="block">
                                {formik.errors.profilePicture}
                            </Typography>
                        )}
                        {preview && (
                            <Box mt={2}>
                                <Avatar
                                    src={preview}
                                    alt="Profile Preview"
                                    sx={{ width: 80, height: 80, margin: 'auto' }}
                                />
                            </Box>
                        )}
                    </Box>
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Next
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Step1;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Button } from '@mui/material';

interface Step3Props {
    onNext: (data: unknown) => void;
    onBack: () => void;
    initialValues: { cardNumber: string; expiry: string; cvv: string };
}

const Step3: React.FC<Step3Props> = ({ onNext, onBack, initialValues }) => {
    const today = new Date();
    const minExpiryDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .required('Card number is required')
                .matches(/^\d{16}$/, 'Card number must be 16 digits'),
            expiry: Yup.string()
                .required('Expiry date is required')
                .matches(
                    /^(0[1-9]|1[0-2])\/\d{2}$/,
                    'Expiry date must be in MM/YY format'
                )
                .test('not-expired', 'Card has expired', (value) => {
                    if (!value) return false;
                    const [month, year] = value.split('/');
                    const expiryDate = new Date(
                        `20${year}-${month}-01T00:00:00`
                    );
                    return expiryDate > new Date();
                }),
            cvv: Yup.string()
                .required('CVV is required')
                .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
        }),
        onSubmit: (values) => onNext(values),
    });

    const handleCopyCVV = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Card Number"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('cardNumber')}
                error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <TextField
                label="Expiry Date (MM/YY)"
                type="text"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('expiry')}
                error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                helperText={formik.touched.expiry && formik.errors.expiry}
                slotProps={{ htmlInput: { min: minExpiryDate } }} 
            />
            <TextField
                label="CVV"
                type="password"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('cvv')}
                error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                helperText={formik.touched.cvv && formik.errors.cvv}
                slotProps={{ htmlInput: { onCopy: handleCopyCVV } }}
            />

            <Box mt={2}>
                <Button type="button" onClick={onBack} variant="outlined">
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                >
                    Next
                </Button>
            </Box>
        </form>
    );
};

export default Step3;

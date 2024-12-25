import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import CreatableSelect from 'react-select/creatable';

interface Step2Props {
    onNext: (data: { songs: string[] }) => void; 
    onBack: () => void;
    initialValues: { songs: string[] };
}

const initialSongs = [
    'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5',
    'Song 6', 'Song 7', 'Song 8', 'Song 9', 'Song 10'
];

const Step2: React.FC<Step2Props> = ({ onNext, onBack, initialValues }) => {
    const formik = useFormik({
        initialValues: {
            songs: initialValues.songs || [],
        },
        validationSchema: Yup.object({
            songs: Yup.array()
                .of(Yup.string().required('Song name is required'))
                .min(1, 'At least one song is required'),
        }),
        onSubmit: (values) => onNext(values),
    });

    const handleCreate = (inputValue: string) => {
        formik.setFieldValue('songs', [...formik.values.songs, inputValue]);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Add Your Favorite Songs
            </Typography>

            <Box marginBottom="1rem">
                <CreatableSelect
                    isClearable
                    isMulti
                    onCreateOption={handleCreate}
                    options={initialSongs.map((song) => ({ label: song, value: song }))}
                    value={formik.values.songs.map((song) => ({
                        label: song,
                        value: song,
                    }))}
                    onChange={(newValue) => {
                        if (newValue) {
                            const newSongs = newValue.map((item: { value: string }) => item.value)

                            formik.setFieldValue('songs', newSongs);
                        }
                    }}
                    placeholder="Type and press Enter to add a song"
                    components={{ DropdownIndicator: () => null }}
                />
                {formik.errors.songs && formik.touched.songs && (
                    <Typography color="error" variant="caption" display="block" mt={1}>
                        {formik.errors.songs}
                    </Typography>
                )}
            </Box>

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

export default Step2;

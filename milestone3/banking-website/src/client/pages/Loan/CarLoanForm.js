import React from 'react'
import { useState } from "react";
import { Box, Button, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, CircularProgress, OutlinedInput } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form, Field, Formik, ErrorMessage } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header.jsx';
import * as yup from "yup";
import BackButton from '../../../shared/components/BackButton.js';
import CheckIcon from '@mui/icons-material/Check';
import ResponseDialog from '../../components/ResponseDialog.js';

const CarLoanForm = () => {
    const [loading, setLoading] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        resetForm();
        setLoading(false);

        setIsConfirmed(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsConfirmed(false);

        setSubmitting(false);
    };

    const initialValues = {
        make: '',
        model: '',
        year: null,
        loanAmount: '',
        loanTerm: '',
        annualIncome: '',
        employmentStatus: '',
    };
    const checkoutSchema = yup.object().shape({
        make: yup.string().required('Make is required'),
        model: yup.string().required('Model is required'),
        loanAmount: yup.number().required('Loan Amount is required'),
        year: yup
            .date()
            .nullable()
            .required('Year is required')
            .test(
                'valid-year',
                'Year must be between 1950 and 2023',
                (value) =>
                    value === null || (value.getFullYear() >= 1950 && value.getFullYear() <= 2023)
            ),
        annualIncome: yup.number().required('Annual Income is required'),
        loanTerm: yup.string().required('Loan Term required'),
        employmentStatus: yup.string().required('Employment Status is required'),
    });

    const styles = {
        textField: {
            height: '52.7167px', // Adjust the height as per your requirement
        },
    };

    return (
        <Box m="20px">
            <Box display='flex'  alignItems="center">
                <BackButton to="/loan" />
                <Header title='Apply for Car Loan' subtitle='' />
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Make"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                InputProps={{ style: styles.textField }}
                                value={values.make}
                                name="make"
                                error={!!touched.make && !!errors.make}
                                helperText={touched.make && errors.make}
                                sx={{ gridColumn: "span 2" }}
                                required
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Model"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                InputProps={{ style: styles.textField }}
                                value={values.model}
                                name="model"
                                error={!!touched.model && !!errors.model}
                                helperText={touched.model && errors.model}
                                sx={{ gridColumn: "span 1" }}
                                required
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Year of Manufacturing (ONLY 1950-2023 ACCEPTED)"
                                    value={values.year}
                                    views={['year']}
                                    onBlur={handleBlur}
                                    error={touched.year && !!errors.year}
                                    helperText={touched.year && errors.year}
                                    onChange={date => handleChange({ target: { name: 'year', value: date } })}
                                    required
                                />
                            </LocalizationProvider>

                            <FormControl fullWidth
                                sx={{ gridColumn: "span 4" }}>
                                <InputLabel id="employmentSelect">Employment</InputLabel>
                                <Field
                                    value={values.employmentStatus}
                                    as={Select}
                                    name="employmentStatus"
                                >
                                    <MenuItem value={"employed"}>Employed</MenuItem>
                                    <MenuItem value={"selfEmployed"}>Self Employed</MenuItem>
                                    <MenuItem value={"unemployed"}>Unemployed</MenuItem>
                                </Field>
                            </FormControl>

                            <FormControl
                                fullWidth
                                sx={{ gridColumn: "span 4" }}>

                                <InputLabel id="termSelect">Loan Term</InputLabel>
                                <Field
                                    value={values.loanTerm}
                                    as={Select}
                                    name="loanTerm"
                                >
                                    <MenuItem value={12}>12 Months</MenuItem>
                                    <MenuItem value={24}>24 Months</MenuItem>
                                    <MenuItem value={36}>36 Months</MenuItem>
                                    <MenuItem value={48}>48 Months</MenuItem>
                                </Field>
                            </FormControl>

                            <TextField
                                id="outlined-adornment-amount"
                                InputProps={{ style: styles.textField }}
                                sx={{ gridColumn: "span 4" }}
                                startAdornment={<InputAdornment position="start">EGP</InputAdornment>}
                                label="Loan Amount (EGP)"
                                onChange={(event) => {
                                    const numericValue = event.target.value.replace(/[^0-9]/g, "");
                                    handleChange({
                                        target: {
                                            name: "loanAmount",
                                            value: numericValue,
                                        },
                                    });
                                }}
                                value={values.loanAmount}
                                error={touched.loanAmount && !!errors.loanAmount}
                                helperText={touched.loanAmount && errors.loanAmount}
                                minDate={new Date('1950-01-01')}
                                maxDate={new Date('2023-12-31')}
                                required
                            />

                            <TextField
                                id="outlined-adornment-amount"
                                InputProps={{ style: styles.textField }}
                                sx={{ gridColumn: "span 4" }}
                                label="Annual Income (EGP)"
                                onChange={(event) => {
                                    const numericValue = event.target.value.replace(/[^0-9]/g, "");
                                    handleChange({
                                        target: {
                                            name: "annualIncome",
                                            value: numericValue,
                                        },
                                    });
                                }}
                                value={values.annualIncome}
                                error={touched.annualIncome && !!errors.annualIncome}
                                helperText={touched.annualIncome && errors.annualIncome}
                                required

                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            {isSubmitting ? (
                                <CircularProgress color="secondary" size={24} />
                            ) : (
                                <>
                                    {isConfirmed && <CheckIcon style={{ marginRight: '10px', color: 'green' }} />}
                                    <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                                        Confirm
                                    </Button> 
                                </>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};





export default CarLoanForm
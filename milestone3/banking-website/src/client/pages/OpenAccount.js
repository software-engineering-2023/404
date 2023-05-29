import React from 'react'
import { useState } from "react";
import { Box, Button, TextField, Select, InputLabel, MenuItem, FormControl, OutlinedInput, InputAdornment, Radio, RadioGroup, FormControlLabel, FormLabel, Checkbox, Typography } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Form, Field, Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import Header from '../components/Header.jsx';
import SignaturePad from '../components/SignaturePad.js';
import BackButton from '../../shared/components/BackButton.js';
import { useTheme } from '@emotion/react';
import { tokens } from '../../themes.js';


const OpenAccountForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values, { resetForm }) => {
        setLoading(true);
        resetForm({ values: '' });
        await setTimeout(() => { setLoading(false) }, 5000)
    };

    const initialValues = {
        nationalId: '',
        annualIncome: '',
        employer: '',
        livingStatus: '',
        address: '',
        city: '',
        occupation: '',
        maritalStatus: '',
        haveCreditCards: '',
        currentCreditCards: '',
        accountType:''
    };
    const styles = {
        textField: {
            height: '300px',
            // Adjust the height as per your requirement
        },
    };

    // const [creditLimit, setCreditLimit] = useState('');

    // const handleCreditLimitChange = (event) => {
    //     setCreditLimit(event.target.value);
    // };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
  };

    return (
        <Box m="20px">
            <Box display='flex'  alignItems="center">
                <BackButton to="/accounts" />
                <Header title='Open a new Bank Account' subtitle='' />
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={openAccountSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
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
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                onBlur={handleBlur}
                                label="Annual Income (EGP)"
                                InputProps={styles}
                                name='annualIncome'
                                value={values.annualIncome}
                                onChange={handleChange}
                                multiline
                                error={!!touched.annualIncome && !!errors.annualIncome}
                                helperText={touched.annualIncome && errors.annualIncome}
                            />
                             <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="National ID Number"
                                InputProps={styles}
                                multiline
                                required
                                name='nationalId'
                                value={values.nationalId}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.nationalId && !!errors.nationalId}
                                helperText={touched.nationalId && errors.nationalId}
                            />
                            <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="Occupation"
                                InputProps={styles}
                                multiline
                                required
                            />
                            <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="Employer"
                                InputProps={styles}
                                placeholder="If not applicable, clarify here if currently Self-Employed or Unemployed"
                                multiline
                                required
                            />
                            <FormControl>
                                <FormLabel id="livingStatus">Are you a</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="homeOwner" control={<Radio />} label="Homeowner" />
                                    <FormControlLabel value="renter" control={<Radio />} label="Renter" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="maritalStatus">Marital Status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="single" control={<Radio />} label="Single" />
                                    <FormControlLabel value="married" control={<Radio />} label="Married" />
                                    <FormControlLabel value="divorced" control={<Radio />} label="Divorced" />
                                    <FormControlLabel value="widow" control={<Radio />} label="Widow(er)" />

                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="maritalStatus">Account Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Savings" control={<Radio />} label="Savings" />
                                    <FormControlLabel value="Current" control={<Radio />} label="Current" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="Address"
                                placeholder="Please give a current address for card delivery purposes"
                                InputProps={styles}
                                multiline
                                required
                            />
                            <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="City"
                                InputProps={styles}
                                multiline
                                required
                            />
                            <FormControl>
                                <FormLabel id="previousCards">Do you have a credit card? (If yes fill in the following field)</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                sx={{ gridColumn: "span 4" }}
                                variant="outlined"
                                label="Current Credit Cards"
                                placeholder='Please list all your current credit cards and their issuing bank in as many lines as you need'
                                InputProps={styles}
                                multiline
                            />
                            <div>
                                <FormControl fullWidth sx={{display:'flex-row', marginBottom:3}}>
                                    <Typography sx={{marginBottom: 1}} variant="h6" color='white'>Upload Personal Identification</Typography>
                                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                                </FormControl>
                                <div>
                                    <Typography variant="h6" gutterBottom>
                                        Sign here
                                    </Typography>
                                    <SignaturePad />
                                </div>
                                <FormControlLabel
                                    required
                                    control={<Checkbox color="primary" // Use "primary" or "secondary" color for the tick
                                    sx={{
                                      '&.Mui-checked': {
                                        color: colors.grey[200], // Replace with your desired color
                                      },
                                    }}/>}
                                    label="Accept Terms and Conditions"
                                />
                            </div>


                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            {loading ? <div></div> : <Button type="submit" color="secondary" variant="contained">
                                Apply
                            </Button>}
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};



const openAccountSchema = yup.object().shape({
    nationalId: yup.string().required("required"),
    annualIncome: yup.number().required('required'),
    employer: yup.string().required('required'),
    livingStatus: yup.string().required('required'),
    address: yup.string().required("required"),
    city: yup.string().required("required"),
    occupation: yup.string().required("required"),
    maritalStatus: yup.string().required("required"),
    haveCreditCards: yup.string().required("required"),
    currentCreditCards: yup.string().required("required"),
    accountType: yup.string().required("required")
});


export default OpenAccountForm

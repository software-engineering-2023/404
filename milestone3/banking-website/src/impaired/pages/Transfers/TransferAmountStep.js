import React, { useState } from 'react';
import { TextField, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { styled, createTheme, ThemeProvider, withStyles } from '@mui/material/styles';

const TransferAmountStep = ({ onNext, formData }) => {
    const [TransferAmount, setTransferAmount] = useState(formData.TransferAmount || '');
    const [TransferPurpose, setTransferPurpose] = useState(formData.TransferPurpose || '');
    // const [BankName, setBankName] = useState(formData.BankName|| '');
    // const [gender, setGender] = useState(formData.gender || '');

    const handleNext = () => {
        onNext({ TransferAmount,TransferPurpose });
    };
    const CustomFormControlLabel = styled(FormControlLabel)({
        color: 'white', // Replace 'red' with your desired color
    });



    return (
        <div>
            <TextField
                label="Transfer Amount "
                value={TransferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                fullWidth
                margin="normal"

            />
            <TextField
                label="Transfer Purpose (e.g., personal, business, invoice payment, etc.)"
                value={TransferPurpose}
                onChange={(e) => setTransferPurpose(e.target.value)}
                fullWidth
                margin="normal"

            />
            

            {/* <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                <CustomFormControlLabel value="male" control={<Radio />} label="Male" />
                <CustomFormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup> */}
            <button onClick={handleNext}></button>
        </div>
    );
};

export default TransferAmountStep;
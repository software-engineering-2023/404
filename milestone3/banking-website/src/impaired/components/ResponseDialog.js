import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { payBill } from '../../store';
import Avatar from '@mui/material/Avatar';
import { Button, DialogActions, DialogContent, DialogContentText, Slide } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useSpeechSynthesis } from 'react-speech-kit';


function ResponseDialog({ submit, response }) {
    const { speak , cancel } = useSpeechSynthesis();
    const speakText = (text) => {
      speak({ text });
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
            onMouseLeave={() => cancel()}
            onMouseEnter={() => {speakText('Confirm button press to submit' )}} 
            type="submit" color="secondary" variant="contained" onClick={handleClickOpen}>
                {submit}
            </Button>
            <Dialog
                onMouseLeave={() => cancel()}
                onMouseEnter={() => {speakText('Response popup')}} 
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >               
                <div className='flex flex-col items-center m-3'>
                    {response === "success"? <CheckCircleOutlineIcon style={{ color: 'green' }} fontSize='large'/>: <DangerousIcon style={{ color: 'red' }} fontSize='large'/>}
                    <DialogContent>
                    <DialogContentText
                     id="alert-dialog-slide-description">
                        {response === "success"? 'Sent successfully': 'Failed to send'}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        onMouseLeave={() => cancel()}
                        onMouseEnter={() => {speakText('Ok Button to close the popup')}} 
                         type="submit" color="secondary" variant="contained" onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default ResponseDialog

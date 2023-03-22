import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React from 'react'

function SimpleConfirm({ message, title, open, onClose, onConfirm, ...rest }) {


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"


        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant='h4'>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ minWidth: 400 }}>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant='h5'>
                        {message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={onConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SimpleConfirm
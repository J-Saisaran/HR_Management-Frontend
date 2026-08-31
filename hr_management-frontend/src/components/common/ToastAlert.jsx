import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastAlert = ({ open, message, severity = 'success', onClose, autoHideDuration = 4000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%', fontWeight: 500 }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;

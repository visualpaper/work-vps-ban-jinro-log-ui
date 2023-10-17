import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import React from 'react'

export const SnackbarAlert: React.FC<{
  isOpen: boolean
  message: string
  handleClose: () => void
}> = ({ isOpen, message, handleClose }) => {
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={() => handleClose()}
    >
      <MuiAlert
        onClose={() => handleClose()}
        severity="warning"
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

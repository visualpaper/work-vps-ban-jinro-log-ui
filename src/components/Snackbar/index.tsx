import { Alert, Snackbar } from '@mui/material'

export const SnackbarAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            人狼通報ログまとめ
          </Typography>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

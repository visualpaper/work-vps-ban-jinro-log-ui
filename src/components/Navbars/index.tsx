import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()

  return (
    <>
      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Button
              sx={{
                fontSize: '20px',
                mr: 5,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={() => {
                navigate('/')
              }}
            >
              人狼通報ログまとめ
            </Button>
            <Box display="flex" flexGrow={1}>
              <Button
                sx={{
                  fontSize: '17px',
                  color: 'inherit',
                  textTransform: 'none',
                }}
              >
                Search
              </Button>
            </Box>
            <Button
              sx={{
                mr: 5,
                fontSize: '17px',
                color: 'inherit',
                textTransform: 'none',
              }}
            >
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}

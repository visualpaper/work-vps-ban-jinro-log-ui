import {
  AppBar,
  Box,
  Button,
  Container,
  SxProps,
  Theme,
  Toolbar,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const titleStyle: SxProps<Theme> = {
  mr: 5,
  fontSize: '20px',
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}

const buttonStyle: SxProps<Theme> = {
  fontSize: '17px',
  color: 'inherit',
  textTransform: 'none',
}

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()

  return (
    <>
      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Button
              sx={titleStyle}
              onClick={() => {
                navigate('/')
              }}
            >
              人狼通報ログまとめ
            </Button>
            <Box display="flex" flexGrow={1}>
              <Button
                sx={buttonStyle}
                onClick={() => {
                  navigate('/search')
                }}
              >
                検索
              </Button>
            </Box>
            <Button sx={{ ...buttonStyle, mr: 5 }}>お問い合わせ</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}

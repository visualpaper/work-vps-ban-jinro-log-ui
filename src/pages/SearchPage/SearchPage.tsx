import { Box, Grid, SxProps, Theme } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { SearchForm } from '../../components/SearchForm'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

const createdByStyle: SxProps<Theme> = {
  color: '#777',
  fontSize: 10,
  textAlign: 'right',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const SearchPage: React.FC = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])

  // direction="column": 縦方向に並べる
  // justifyContent="center": 縦方向の中間から並べる
  // alignItems="stretch": 横方向いっぱい利用する
  // spacing: 各 Grid Item ごとの間隔
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            検索
          </Box>
          <Box>
            <SearchForm
              defaultValue={{
                people_min: 8,
                people_max: 30,
                position: [],
              }}
              fetching={false}
              handleSubmit={() => {}}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Box component="p" sx={createdByStyle}>
          本ページで利用されているリソースの全ての権利は人狼ゲーム
          るる鯖にあります
          <br />
          Created by visualpaper
        </Box>
      </Grid>
    </>
  )
}

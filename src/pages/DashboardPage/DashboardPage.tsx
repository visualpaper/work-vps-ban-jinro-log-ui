import { Box, Divider, Grid, SxProps, Theme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useContext, useEffect } from 'react'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

const createdByStyle: SxProps<Theme> = {
  color: '#777',
  textAlign: 'right',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const DashboardPage: React.FC = () => {
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
            本サイトについて
          </Box>
          <Box component="p" sx={contentStyle}>
            人狼ゲーム るる鯖{' '}
            <Link to="https://ruru-jinro.net/" target="_blank">
              https://ruru-jinro.net/
            </Link>{' '}
            の過去ログから、荒らし行為によって廃村になったログをまとめています。
            <br />
            荒らしプレイヤーを確認する際にご利用いただければ幸いです。
          </Box>
          <Box component="p" sx={contentStyle}>
            何かございましたら<a href="">お問い合わせ</a>
            ページよりご連絡ください。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            最近追加されたログ
          </Box>
        </Grid>
      </Grid>
      <Divider />
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

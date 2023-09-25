import { Box, Grid, SxProps, Theme } from '@mui/material'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const DashboardPage: React.FC = () => {
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
            人狼ゲーム るる鯖 https://ruru-jinro.net/
            の過去ログから、荒らし行為によって廃村になったログをまとめています。
            <br />
            荒らしプレイヤーを確認するために利用いただければ嬉しいです。
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

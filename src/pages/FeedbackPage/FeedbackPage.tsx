import { Box, Grid, SxProps, Theme } from '@mui/material'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { FeedbackForm } from '../../components/FeedbackForm'
import { useSendFeedbackMutation } from '../../types/generated/query'
import { graphqlRequestClient } from '../../common/client'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { toast } from 'react-toastify'
import { COMMON_MESSAGES } from '../../common/messages'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

const createdByStyle: SxProps<Theme> = {
  color: '#777',
  fontSize: 10,
  textAlign: 'right',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const FeedbackPage: React.FC = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { isLoading, mutate } = useSendFeedbackMutation(graphqlRequestClient, {
    onSuccess: () => {
      // 送信後、ポップアップを表示しトップページに戻る。
      toast.info(COMMON_MESSAGES.SUCCESS_FEED_BACK)
      navigate('/')
    },
    onError: defaultOnError,
    useErrorBoundary: defaultUseErrorBoundary,
  })
  const handleSubmit = (name: string, address: string, content: string) => {
    mutate({
      input: {
        name,
        address,
        content,
      },
    })
  }

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
            お問い合わせ
          </Box>
          <Box component="p" sx={contentStyle}>
            お問い合わせフォームをご利用の際は、必ず
            <Link to="/privacypolicy" target="_blank">
              「プライバシーポリシー」
            </Link>
            をご一読ください。
            <br />
            内容に同意していただけましたら、下記フォームに必要事項をご入力のうえ、送信ボタンを押してください。
          </Box>
          <Box>
            <FeedbackForm
              defaultValue={{
                name: '',
                address: '',
                content: '',
              }}
              fetching={isLoading}
              handleSubmit={handleSubmit}
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

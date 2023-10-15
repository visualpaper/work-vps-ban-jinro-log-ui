import { Box, Divider, Grid, SxProps, Theme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { graphqlRequestClient } from '../../common/client'
import { Fragment, useContext, useEffect, useMemo } from 'react'
import {
  ListVillagesQuery,
  Village,
  VillageBans,
  useListVillagesQuery,
} from '../../types/generated/query'
import {
  AppError,
  defaultUseErrorBoundary,
  ifAppErrorWith,
} from '../../common/error'
import { SnackbarAlert } from '../../components/Snackbar'
import { ColumnDef } from '@tanstack/react-table'
import { FixedTable } from '../../components/FixedTable'
import { formatEndDate } from '../../common/date'

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
  const { data: villagesData, isFetching: villagesIsFetching } =
    useListVillagesQuery<ListVillagesQuery>(
      graphqlRequestClient,
      {},
      {
        enabled: true, // 表示時に実行
        onError: (error: any) =>
          ifAppErrorWith(error, (error: AppError) => (
            <SnackbarAlert message={error.getDisplayMessage()} />
          )),
        useErrorBoundary: defaultUseErrorBoundary,
        suspense: false,
      },
    )

  const columns = useMemo<ColumnDef<Village | any>[]>(
    () => [
      {
        header: 'No.',
        size: 100,
        accessorKey: 'number',
      },
      {
        header: '終了時刻',
        size: 200,
        cell: ({ row }) => {
          return formatEndDate(row.original.endDate)
        },
      },
      {
        header: '村名',
        cell: ({ row }) => {
          return (
            <Link to={row.original.url} target="_blank">
              {row.original.name}
            </Link>
          )
        },
      },
      {
        header: '役職',
        size: 100,
        cell: ({ row }) => {
          return (
            <>
              {row.original.bans.map((ban: VillageBans) => (
                <div>{ban.position}</div>
              ))}
            </>
          )
        },
      },
      {
        header: '通報対象者',
        size: 100,
        cell: ({ row }) => {
          return (
            <>
              {row.original.bans.map((ban: VillageBans) => (
                <div>{ban.trip}</div>
              ))}
            </>
          )
        },
      },
    ],
    [villagesData],
  )

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])

  if (villagesIsFetching) {
    return <Fragment />
  }

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
          <Box component="p" sx={createdByStyle}>
            {villagesData && (
              <>
                <FixedTable<Village | any>
                  data={villagesData.villages}
                  columns={columns}
                />
              </>
            )}
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

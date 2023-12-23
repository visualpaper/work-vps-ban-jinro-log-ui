import { Box, Grid, SxProps, Theme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { graphqlRequestClient } from '../../common/client'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import {
  ListVillagesQuery,
  Village,
  VillageBans,
  useListVillagesQuery,
} from '../../types/generated/query'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { ColumnDef } from '@tanstack/react-table'
import { FixedTable } from '../../components/FixedTable'
import {
  formatEndDate,
  toCastString,
  toPositionString,
} from '../../model/village'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

const createdByStyle: SxProps<Theme> = {
  color: '#777',
  fontSize: 10,
  textAlign: 'right',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const DashboardPage: React.FC = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [villagesData, setVillagesData] = useState<ListVillagesQuery | null>(
    null,
  )
  useListVillagesQuery<ListVillagesQuery>(
    graphqlRequestClient,
    // variable が変化しない都合上
    // F5 での更新時に onError に来ない？ように見える。
    // 仕様かもしれないので、挙動だけ覚えておく。
    {
      input: {
        position: [],
        cast: [],
      },
    },
    {
      enabled: submitted, // 表示時に実行でなく user 取得後実施
      onSuccess: (data: ListVillagesQuery) => {
        // 自動で読み込みが走らないように無効化
        setSubmitted(false)
        setVillagesData(data!)
      },
      onError: defaultOnError,
      useErrorBoundary: defaultUseErrorBoundary,
      suspense: false,
    },
  )

  const columns = useMemo<ColumnDef<Village | any>[]>(
    () => [
      {
        header: 'No.',
        size: 25,
        accessorKey: 'number',
      },
      {
        header: '終了時刻',
        size: 100,
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
        header: '配役',
        size: 20,
        cell: ({ row }) => {
          return <>{row.original.people + toCastString(row.original.cast)}</>
        },
      },
      {
        header: '通報対象者',
        size: 200,
        cell: ({ row }) => {
          return (
            <>
              {row.original.bans.map((ban: VillageBans, index: number) => (
                <div key={index}>{ban.trip}</div>
              ))}
            </>
          )
        },
      },
      {
        header: '役職',
        size: 25,
        cell: ({ row }) => {
          return (
            <>
              {row.original.bans.map((ban: VillageBans, index: number) => (
                <div key={index}>{toPositionString(ban.position)}</div>
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
    setSubmitted(true)
  }, [])

  if (!villagesData) {
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
            <Link to="https://ruru-jinro.net/" target="_blank">
              人狼ゲーム るる鯖
            </Link>
            の過去ログから、荒らし行為によって通報があったログをまとめています。
            <br />
            荒らしプレイヤーを確認する際にご利用いただければ幸いです。
          </Box>
          <Box component="p" sx={contentStyle}>
            何かございましたら<Link to="/contact">お問い合わせ</Link>
            ページよりご連絡ください。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            最近追加されたログ
          </Box>
          <Box component="div" sx={contentStyle}>
            {villagesData && (
              <>
                <FixedTable<Village | any>
                  data={villagesData.villages.items}
                  columns={columns}
                />
              </>
            )}
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

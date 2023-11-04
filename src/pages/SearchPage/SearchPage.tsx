import { Box, Grid, SxProps, Theme } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { SearchForm } from '../../components/SearchForm'
import {
  ListVillagesQuery,
  Village,
  VillageBans,
  VillageCast,
  VillagePosition,
  useListVillagesQuery,
} from '../../types/generated/query'
import { graphqlRequestClient } from '../../common/client'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { ColumnDef } from '@tanstack/react-table'
import {
  formatEndDate,
  toCastString,
  toPositionString,
} from '../../model/village'
import { FixedTable } from '../../components/FixedTable'
import { PageLoader } from '../../components/PageLoader'

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
  const [villagesQuery, setVillagesQuery] = useState<{
    people_min: number
    people_max: number
    cast: VillageCast[]
    position: VillagePosition[]
    trip?: string
    skip?: number
    take?: number
  }>({
    people_min: 8,
    people_max: 30,
    cast: [],
    position: [],
  })
  const [villagesData, setVillagesData] = useState<ListVillagesQuery | null>(
    null,
  )
  const [submitted, setSubmitted] = useState<boolean>(false)
  const { isFetching } = useListVillagesQuery<ListVillagesQuery>(
    graphqlRequestClient,
    {
      // QueryKey にあるものが変化した場合、自動で読み込みが走る。
      input: {
        trip: villagesQuery.trip,
        people_min: villagesQuery.people_min,
        people_max: villagesQuery.people_max,
        cast: villagesQuery.cast,
        position: villagesQuery.position,
        skip: villagesQuery.skip,
        take: villagesQuery.take,
      },
    },
    {
      enabled: submitted, // Submit 時に input を変更し、有効化
      onSuccess: (data) => {
        // 自動で読み込みが走らないように無効化
        setSubmitted(false)
        setVillagesData(data!)
      },
      onError: (e) => {
        // 自動で読み込みが走らないように無効化
        setSubmitted(false)
        defaultOnError(e)
      },
      useErrorBoundary: defaultUseErrorBoundary,
      suspense: false,
    },
  )

  const columns = useMemo<ColumnDef<Village | any>[]>(
    () => [
      {
        header: 'No.',
        size: 30,
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
        size: 40,
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

  const handleSearch = (
    people_min: number,
    people_max: number,
    cast: VillageCast[],
    position: VillagePosition[],
    trip?: string,
  ) => {
    setVillagesQuery({
      trip: trip,
      people_min: people_min,
      people_max: people_max,
      cast: cast,
      position: position,
      // 最初は 0 ～ 100 までとしている。
      skip: 0,
      take: 100,
    })
    setSubmitted(true)

    // ここで refetch せずとも enable と input を操作することで実現できたので refetch は使っていない。
    //refetch()
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
            検索
          </Box>
          <Box>
            <SearchForm
              defaultValue={{
                people_min: 8,
                people_max: 30,
                position: [],
              }}
              fetching={isFetching}
              handleSubmit={handleSearch}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="div" sx={contentStyle}>
            <PageLoader isPageLoading={isFetching}>
              {villagesData && (
                <FixedTable<Village | any>
                  data={villagesData.villages}
                  columns={columns}
                />
              )}
            </PageLoader>
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

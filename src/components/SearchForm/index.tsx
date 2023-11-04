import { useForm } from 'react-hook-form'
import { VillageCast, VillagePosition } from '../../types/generated/query'
import { Box, Button, Container, Grid, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import { LeftConditions } from './leftConditions'
import { RightConditions } from './rightConditions'

const formStyle: SxProps<Theme> = {
  backgroundColor: '#fff',
  borderRadius: '0.25rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  mt: 4,
  p: 3,
}

export type SearchFormValue = {
  trip?: string
  people_min: number
  people_max: number
  cast?: VillageCast[]
  position: VillagePosition[]
}

export type SelectPosition = {
  fox: boolean
  apostate: boolean
  wolf: boolean
  fanatic: boolean
  madman: boolean
  seer: boolean
  medium: boolean
  hunter: boolean
  cat: boolean
  mason: boolean
  villager: boolean
}

export const SearchForm: React.FC<{
  defaultValue: SearchFormValue
  fetching: boolean
  handleSubmit: (
    people_min: number,
    people_max: number,
    cast: VillageCast[],
    position: VillagePosition[],
    trip?: string,
  ) => void
}> = ({ defaultValue, fetching, handleSubmit }) => {
  const {
    control,
    reset,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<SearchFormValue>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: defaultValue,
  })
  const [selectCast, setSelectCast] = useState<string>('')
  const [selectPositions, setSelectPositions] = useState<SelectPosition>({
    fox: true,
    apostate: true,
    wolf: true,
    fanatic: true,
    madman: true,
    seer: true,
    medium: true,
    hunter: true,
    cat: true,
    mason: true,
    villager: true,
  })

  const handleClear = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>, // eslint-disable-line unused-imports/no-unused-vars
  ) => {
    setSelectCast('')
    setSelectPositions({
      fox: true,
      apostate: true,
      wolf: true,
      fanatic: true,
      madman: true,
      seer: true,
      medium: true,
      hunter: true,
      cat: true,
      mason: true,
      villager: true,
    })
    reset()
  }

  const toVillageCast = (selectCast: string): VillageCast => {
    switch (selectCast) {
      case 'A':
        return VillageCast.A
      case 'B':
        return VillageCast.B
      case 'C':
        return VillageCast.C
      case 'D':
        return VillageCast.D
      case 'Z':
        return VillageCast.Z
      default:
        throw new Error('unexpected')
    }
  }

  const toVillagePosition = (
    selectPositions: SelectPosition,
  ): VillagePosition[] => {
    const position = []

    if (selectPositions.fox) {
      position.push(VillagePosition.Fox)
    }
    if (selectPositions.apostate) {
      position.push(VillagePosition.Apostate)
    }

    if (selectPositions.wolf) {
      position.push(VillagePosition.Wolf)
    }
    if (selectPositions.fanatic) {
      position.push(VillagePosition.Fanatic)
    }
    if (selectPositions.madman) {
      position.push(VillagePosition.Madman)
    }

    if (selectPositions.seer) {
      position.push(VillagePosition.Seer)
    }
    if (selectPositions.medium) {
      position.push(VillagePosition.Medium)
    }
    if (selectPositions.hunter) {
      position.push(VillagePosition.Hunter)
    }
    if (selectPositions.cat) {
      position.push(VillagePosition.Cat)
    }
    if (selectPositions.mason) {
      position.push(VillagePosition.Mason)
    }
    if (selectPositions.villager) {
      position.push(VillagePosition.Villager)
    }
    return position
  }

  const onSubmit = (values: SearchFormValue) => {
    const cast: VillageCast[] = []

    if (selectCast) {
      cast.push(toVillageCast(selectCast))
    }
    const positions: VillagePosition[] = toVillagePosition(selectPositions)

    if (values.trip) {
      handleSubmit(
        values.people_min,
        values.people_max,
        cast,
        positions,
        values.trip,
      )
    } else {
      handleSubmit(values.people_min, values.people_max, cast, positions)
    }
  }

  return (
    <Box component="form" onSubmit={handleFormSubmit(onSubmit)} sx={formStyle}>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <LeftConditions
              control={control}
              errors={errors}
              selectCast={selectCast}
              setSelectCast={setSelectCast}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <RightConditions
              selectPositions={selectPositions}
              setSelectPositions={setSelectPositions}
            />
          </Grid>
        </Grid>
      </Container>
      <Box
        component={'hr'}
        sx={{ borderStyle: 'solid', borderColor: '#e2e8f0', mb: 2 }}
      />
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={1}>
          <Button type="submit" variant="contained" disabled={fetching}>
            検索
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" onClick={handleClear} disabled={fetching}>
            クリア
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

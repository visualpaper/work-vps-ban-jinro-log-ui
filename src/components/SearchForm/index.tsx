import { useForm } from 'react-hook-form'
import { VillageCast, VillagePosition } from '../../types/generated/query'
import { Box, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, NativeSelect, Select, SxProps, Theme, makeStyles, styled } from '@mui/material'

const formStyle: SxProps<Theme> = {
  backgroundColor: "#fff",
  borderRadius: "0.25rem",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  marginTop: 4,
  padding: 3
}

export type SearchFormValue = {
  trip?: string
  people_min: number
  people_max: number
  cast: VillageCast[]
  position: VillagePosition[]
}

export const SearchForm: React.FC<{
  defaultValue: SearchFormValue
  fetching: boolean
  handleSummit: (
    people_min: number,
    people_max: number,
    cast: VillageCast[],
    position: VillagePosition[],
    trip?: string
  ) => void
}> = ({ defaultValue, fetching, handleSummit }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<SearchFormValue>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: defaultValue
  })

  const onSubmit = (values: SearchFormValue) => {
    handleSummit(
      values.people_min,
      values.people_max,
      values.cast,
      values.position,
      values.trip
    )
  }

  return (
    <Box component="form" onSubmit={handleFormSubmit(onSubmit)} sx={formStyle}>
      <Grid container columnSpacing={{ md: 3 }}>

        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="trip-input">トリップ</InputLabel>
            <Input id="my-trip" />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="select-people-min-label">人数(最小)</InputLabel>
            <Select
              labelId="select-people-min-label"
              id="select-people-min"
              onChange={() => {}}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="select-people-max-label">人数(最大)</InputLabel>
            <Select
              labelId="select-people-max-label"
              id="select-people-max"
              onChange={() => {}}
            >
              <MenuItem value={28}>28</MenuItem>
              <MenuItem value={29}>29</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

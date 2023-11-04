import { Control, Controller, FieldErrors } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { SearchFormValue } from '.'

export const LeftConditions: React.FC<{
  control: Control<SearchFormValue, any>
  errors: FieldErrors<SearchFormValue>
  selectCast: string
  setSelectCast: (value: string) => void
}> = ({ control, errors, selectCast, setSelectCast }) => {
  const handleSelectCastChange = (event: SelectChangeEvent) => {
    setSelectCast(event.target.value)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          name="trip"
          control={control}
          defaultValue=""
          // 以下でルール設定可能
          // rules={{
          //   required: { value: true, message: '必須入力' }
          // }}
          render={({ field }) => (
            <TextField
              {...field}
              label="トリップ"
              variant="standard"
              fullWidth
              error={errors.trip ? true : false}
              helperText={errors.trip?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={2.5}>
            <Controller
              name="people_min"
              control={control}
              defaultValue={8}
              render={({ field }) => (
                <FormControl fullWidth error={errors.people_min ? true : false}>
                  <InputLabel id="select-people-min-label">人数</InputLabel>
                  <Select
                    labelId="select-people-min-label"
                    id="select-people-min"
                    label="Select"
                    variant="standard"
                    {...field}
                  >
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.people_min?.message || ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={1.5}>
            <FormControl>
              <FormLabel sx={{ mt: 2.5 }}>～</FormLabel>
            </FormControl>
          </Grid>

          <Grid item xs={2.5}>
            <Controller
              name="people_max"
              control={control}
              defaultValue={30}
              render={({ field }) => (
                <FormControl fullWidth error={errors.people_max ? true : false}>
                  <InputLabel id="select-people-max-label"></InputLabel>
                  <Select
                    labelId="select-people-max-label"
                    id="select-people-max"
                    label="Select"
                    variant="standard"
                    {...field}
                  >
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={29}>29</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.people_max?.message || ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                配役
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectCast}
                onChange={handleSelectCastChange}
                label="配役"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'A'}>A</MenuItem>
                <MenuItem value={'B'}>B</MenuItem>
                <MenuItem value={'C'}>C</MenuItem>
                <MenuItem value={'D'}>D</MenuItem>
                <MenuItem value={'Z'}>Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

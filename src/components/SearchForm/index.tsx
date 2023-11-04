import { Controller, useForm } from 'react-hook-form'
import { VillageCast, VillagePosition } from '../../types/generated/query'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Theme,
} from '@mui/material'
import { useState } from 'react'

const formStyle: SxProps<Theme> = {
  backgroundColor: '#fff',
  borderRadius: '0.25rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  mt: 4,
  ml: 10,
  mr: 10,
  p: 3,
}

export type SearchFormValue = {
  trip?: string
  people_min: number
  people_max: number
  cast?: VillageCast[]
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
    trip?: string,
  ) => void
}> = ({ defaultValue, fetching, handleSummit }) => {
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
  const [positions, setPositions] = useState({
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

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPositions({
      ...positions,
      [event.target.name]: event.target.checked,
    })
  }

  const handleSelectCastChange = (event: SelectChangeEvent) => {
    setSelectCast(event.target.value)
  }

  const handleClear = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>, // eslint-disable-line unused-imports/no-unused-vars
  ) => {
    setSelectCast('')
    setPositions({
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

  const onSubmit = (values: SearchFormValue) => {
    const cast: VillageCast[] = []

    console.log(values)
    console.log(selectCast)
    console.log(positions)

    handleSummit(
      values.people_min,
      values.people_max,
      cast,
      values.position,
      values.trip,
    )
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
                        <FormControl
                          fullWidth
                          error={errors.people_min ? true : false}
                        >
                          <InputLabel id="select-people-min-label">
                            人数
                          </InputLabel>
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
                        <FormControl
                          fullWidth
                          error={errors.people_max ? true : false}
                        >
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
          </Grid>
          <Grid item xs={6}>
            <Grid style={{ height: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <FormControl
                  sx={{ m: 2 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.fox}
                          onChange={handlePositionChange}
                          name="fox"
                        />
                      }
                      label="妖狐"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.apostate}
                          onChange={handlePositionChange}
                          name="apostate"
                        />
                      }
                      label="背徳者"
                    />
                  </FormGroup>
                </FormControl>
                <FormControl
                  required
                  component="fieldset"
                  sx={{ m: 2 }}
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.wolf}
                          onChange={handlePositionChange}
                          name="wolf"
                        />
                      }
                      label="人狼"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.fanatic}
                          onChange={handlePositionChange}
                          name="fanatic"
                        />
                      }
                      label="狂信者"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.madman}
                          onChange={handlePositionChange}
                          name="madman"
                        />
                      }
                      label="狂人"
                    />
                  </FormGroup>
                </FormControl>
                <FormControl
                  required
                  component="fieldset"
                  sx={{ m: 2 }}
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.seer}
                          onChange={handlePositionChange}
                          name="seer"
                        />
                      }
                      label="占い師"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.medium}
                          onChange={handlePositionChange}
                          name="medium"
                        />
                      }
                      label="霊能"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.hunter}
                          onChange={handlePositionChange}
                          name="hunter"
                        />
                      }
                      label="狩人"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.cat}
                          onChange={handlePositionChange}
                          name="cat"
                        />
                      }
                      label="猫又"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.mason}
                          onChange={handlePositionChange}
                          name="mason"
                        />
                      }
                      label="共有"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={positions.villager}
                          onChange={handlePositionChange}
                          name="villager"
                        />
                      }
                      label="村人"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
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

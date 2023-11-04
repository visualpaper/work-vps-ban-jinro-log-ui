import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material'
import { SelectPosition } from '.'

export const RightConditions: React.FC<{
  selectPositions: SelectPosition
  setSelectPositions: (value: SelectPosition) => void
}> = ({ selectPositions, setSelectPositions }) => {
  const handleSelectPositionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectPositions({
      ...selectPositions,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Grid style={{ height: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.fox}
                  onChange={handleSelectPositionChange}
                  name="fox"
                />
              }
              label="妖狐"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.apostate}
                  onChange={handleSelectPositionChange}
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
                  checked={selectPositions.wolf}
                  onChange={handleSelectPositionChange}
                  name="wolf"
                />
              }
              label="人狼"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.fanatic}
                  onChange={handleSelectPositionChange}
                  name="fanatic"
                />
              }
              label="狂信者"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.madman}
                  onChange={handleSelectPositionChange}
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
                  checked={selectPositions.seer}
                  onChange={handleSelectPositionChange}
                  name="seer"
                />
              }
              label="占い師"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.medium}
                  onChange={handleSelectPositionChange}
                  name="medium"
                />
              }
              label="霊能"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.hunter}
                  onChange={handleSelectPositionChange}
                  name="hunter"
                />
              }
              label="狩人"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.cat}
                  onChange={handleSelectPositionChange}
                  name="cat"
                />
              }
              label="猫又"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.mason}
                  onChange={handleSelectPositionChange}
                  name="mason"
                />
              }
              label="共有"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectPositions.villager}
                  onChange={handleSelectPositionChange}
                  name="villager"
                />
              }
              label="村人"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Grid>
  )
}

import {
  Box,
  Button,
  Container,
  Grid,
  SxProps,
  TextField,
  Theme,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const formStyle: SxProps<Theme> = {
  backgroundColor: '#fff',
  borderRadius: '0.25rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  mt: 4,
  p: 3,
}

export type FeedbackFormValue = {
  name: string
  address: string
  content: string
}

export const FeedbackForm: React.FC<{
  defaultValue: FeedbackFormValue
  fetching: boolean
  handleSubmit: (name: string, address: string, content: string) => void
}> = ({ defaultValue, fetching, handleSubmit }) => {
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<FeedbackFormValue>({
    mode: 'onSubmit',

    reValidateMode: 'onSubmit',
    defaultValues: defaultValue,
  })

  const onSubmit = (values: FeedbackFormValue) => {
    handleSubmit(values.name, values.address, values.content)
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
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: '必須' },
                validate: {
                  maxLength: (v) =>
                    v.length <= 20 || '20 文字以内で入力してください',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="お名前"
                  required
                  variant="standard"
                  error={errors.name ? true : false}
                  helperText={errors.name?.message as string}
                  data-testid="testName"
                  style={{ width: 250 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              rules={{
                required: { value: true, message: '必須' },
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 || '50 文字以内で入力してください',
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'メールアドレスの形式が不正です',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="メールアドレス"
                  required
                  variant="standard"
                  error={errors.address ? true : false}
                  helperText={errors.address?.message as string}
                  data-testid="testAddress"
                  type="email"
                  style={{ width: 600 }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="content"
              control={control}
              rules={{
                required: { value: true, message: '必須' },
                validate: {
                  maxLength: (v) =>
                    v.length <= 300 || '300 文字以内で入力してください',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="内容"
                  required
                  fullWidth
                  error={errors.content ? true : false}
                  helperText={errors.content?.message as string}
                  data-testid="testContent"
                  rows={10}
                  multiline
                />
              )}
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
          <Button
            type="submit"
            variant="contained"
            disabled={fetching}
            data-testid="testSubmit"
          >
            送信
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

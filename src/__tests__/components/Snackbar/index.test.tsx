import { render, screen, waitFor } from '@testing-library/react'
import { SnackbarAlert } from '../../../components/Snackbar'

describe('SnackbarAlert', () => {
  test('正常系', async () => {
    const { container } = render(
      <SnackbarAlert
        isOpen={true}
        message={'Alert Message'}
        handleClose={() => {}}
      />,
    )

    await waitFor(() => {
      expect(container.getElementsByClassName('MuiAlert-message').length).toBe(
        1,
      )
    })
    expect(screen.getByText(/Alert Message/)).toBeInTheDocument()
  })
})

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbars } from '../../../components/Navbars'

const mockedNavigator = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}))

describe('Navbars', () => {
  test('初期表示', async () => {
    render(
      <BrowserRouter basename={''}>
        <Navbars />
      </BrowserRouter>,
    )

    // タイトルが表示されるまで待機する
    await waitFor(() =>
      expect(screen.queryByText('人狼通報ログまとめ')).toBeInTheDocument(),
    )

    // 各メニューが表示され、押下可能であること
    expect(screen.getByText('人狼通報ログまとめ')).toBeEnabled()
    expect(screen.getByText('Search')).toBeEnabled()
    expect(screen.getByText('About')).toBeEnabled()
  })

  test('タイトルを押下した場合', async () => {
    render(
      <BrowserRouter basename={''}>
        <Navbars />
      </BrowserRouter>,
    )

    // タイトルが表示されるまで待機する
    await waitFor(() =>
      expect(screen.queryByText('人狼通報ログまとめ')).toBeInTheDocument(),
    )

    // タイトルが押下可能であること
    expect(screen.getByText('人狼通報ログまとめ')).toBeEnabled()

    // タイトルを押下する
    await act(() => {
      fireEvent.click(screen.getByText('人狼通報ログまとめ'))
    })

    // タイトルが表示されるまで待機する
    await waitFor(() =>
      expect(screen.queryByText('人狼通報ログまとめ')).toBeInTheDocument(),
    )

    // "/" が呼ばれていることを確認
    expect(mockedNavigator).toHaveBeenCalledWith('/')
    expect(mockedNavigator).toHaveBeenCalledTimes(1)

    // 各メニューが表示され、押下可能であること
    expect(screen.getByText('人狼通報ログまとめ')).toBeEnabled()
  })
})

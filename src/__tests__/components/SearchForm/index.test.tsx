import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SearchForm, SearchFormValue } from '../../../components/SearchForm'

describe('SearchForm', () => {
  let mockedHandleSubmit: any

  const setUp = (defaultValue: SearchFormValue) => {
    mockedHandleSubmit = jest.fn()

    render(
      <SearchForm
        defaultValue={defaultValue}
        fetching={false}
        handleSubmit={mockedHandleSubmit}
      />,
    )
    const tripElement = screen.getByTestId('testTrip').querySelector('input')!
    const peopleMinElement = screen.getByTestId('testPeopleMin')
    const peopleMaxElement = screen.getByTestId('testPeopleMax')
    const castElement = screen.getByTestId('testCast')
    const submitButtonElement = screen.getByTestId('testSubmit')
    const clearButtonElement = screen.getByTestId('testClear')

    return {
      tripElement,
      peopleMinElement,
      peopleMaxElement,
      castElement,
      submitButtonElement,
      clearButtonElement,
    }
  }

  test('fetching 状態の場合', async () => {
    render(
      <SearchForm
        defaultValue={{
          people_min: 8,
          people_max: 30,
          position: [],
        }}
        fetching={true}
        handleSubmit={mockedHandleSubmit}
      />,
    )

    // 表示されるまで待機する
    await waitFor(() => {
      expect(screen.getByTestId('testSubmit')).toBeInTheDocument()
    })

    // 検索ボタンが非活性であること。
    expect(screen.getByTestId('testSubmit')).toBeDisabled()
    expect(screen.getByTestId('testClear')).toBeDisabled()
  })

  test('デフォルト状態で Submit した場合', async () => {
    const { submitButtonElement } = setUp({
      people_min: 8,
      people_max: 30,
      position: [],
    })

    // 表示されるまで待機する
    await waitFor(() => {
      expect(screen.getByTestId('testSubmit')).toBeInTheDocument()
    })

    // Submit ボタンを押下すると handleSubmit が呼ばれていること
    fireEvent.click(submitButtonElement)
    await waitFor(() => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(1)
    })
    expect(mockedHandleSubmit).toHaveBeenCalledWith(
      8,
      30,
      [],
      [
        'FOX',
        'APOSTATE',
        'WOLF',
        'FANATIC',
        'MADMAN',
        'SEER',
        'MEDIUM',
        'HUNTER',
        'CAT',
        'MASON',
        'VILLAGER',
      ],
    )
  })

  test('入力後に Submit した場合', async () => {
    const { tripElement, submitButtonElement } = setUp({
      people_min: 8,
      people_max: 30,
      position: [],
    })

    // 表示されるまで待機する
    await waitFor(() => {
      expect(screen.getByTestId('testSubmit')).toBeInTheDocument()
    })

    // 各種入力を行う
    fireEvent.change(tripElement, { target: { value: '1' } })
    await waitFor(() => {
      expect(tripElement).toHaveValue('1')
    })

    // Submit ボタンを押下すると handleSubmit が呼ばれていること
    fireEvent.click(submitButtonElement)
    await waitFor(() => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(1)
    })
    expect(mockedHandleSubmit).toHaveBeenCalledWith(
      8,
      30,
      [],
      [
        'FOX',
        'APOSTATE',
        'WOLF',
        'FANATIC',
        'MADMAN',
        'SEER',
        'MEDIUM',
        'HUNTER',
        'CAT',
        'MASON',
        'VILLAGER',
      ],
      '1',
    )
  })

  test('入力後に Clear し Submit した場合', async () => {
    const { tripElement, submitButtonElement, clearButtonElement } = setUp({
      people_min: 8,
      people_max: 30,
      position: [],
    })

    // 表示されるまで待機する
    await waitFor(() => {
      expect(screen.getByTestId('testSubmit')).toBeInTheDocument()
    })

    // 各種入力を行う
    fireEvent.change(tripElement, { target: { value: '1' } })
    await waitFor(() => {
      expect(tripElement).toHaveValue('1')
    })

    // Clear ボタンを押下する
    fireEvent.click(clearButtonElement)

    // Submit ボタンを押下すると handleSubmit が呼ばれていること
    fireEvent.click(submitButtonElement)
    await waitFor(() => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(1)
    })
    expect(mockedHandleSubmit).toHaveBeenCalledWith(
      8,
      30,
      [],
      [
        'FOX',
        'APOSTATE',
        'WOLF',
        'FANATIC',
        'MADMAN',
        'SEER',
        'MEDIUM',
        'HUNTER',
        'CAT',
        'MASON',
        'VILLAGER',
      ],
    )
  })
})

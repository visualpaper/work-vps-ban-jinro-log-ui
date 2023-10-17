import '@testing-library/jest-dom'
import { graphql } from 'msw'
import { setupServer } from 'msw/node'
import { screen, render, waitFor } from '../../test-utils'

// もし delay 等かける場合、デフォルト 5s なので長めにテスト時間を取る必要がある
// jest.setTimeout(10000)

const response = jest.fn()
const api = graphql.link(process.env.REACT_APP_GRAPHQL_ENDPOINT!)
const server = setupServer(
  api.mutation('initialize', response),
  api.query('listVillages', response),
)

beforeAll(() => server.listen())

// 異常系試験時に見えにくいので console.error を表示しないようにしている。
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('初期表示', async () => {
  /*
   * Given
   */
  response.mockImplementation((req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.data({
        initialize: {
          id: 'bfd5677d-6ac6-49db-8904-bd65620785dd',
          villageNumbers: [],
        },
      }),
    )
  })

  /*
   * When
   */
  render('/')

  /*
   * Then
   */

  // AppBar が表示されること
  await waitFor(() => {
    expect(screen.queryByText('人狼通報ログまとめ')).toBeInTheDocument()
  })

  /*
   * ある一定数まで待たせるといったことも可能
  await waitFor(() => expect(container.querySelector("#refreshHeaderIsPageLoding")).not.toBeInTheDocument(), {
    timeout: 3000
  })
  */
})

test('エラー表示', async () => {
  /*
   * Given
   */
  response.mockImplementation((req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.errors([
        {
          message: 'Failed to log in: username or password are invalid',
          extensions: {
            code: 'BASE-0000',
          },
        },
      ]),
    )
  })

  /*
   * When
   */
  render('/')

  /*
   * Then
   */

  // エラー画面が表示されていること
  await waitFor(() => {
    expect(screen.getByText(/Please reopen/)).toBeInTheDocument()
  })
})

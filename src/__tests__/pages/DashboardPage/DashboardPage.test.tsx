import '@testing-library/jest-dom'
import { graphql } from 'msw'
import { setupServer } from 'msw/node'
import { screen, render, waitFor } from '../../test-utils'
import { VillageCast, VillagePosition } from '../../../types/generated/query'

// もし delay 等かける場合、デフォルト 5s なので長めにテスト時間を取る必要がある
// jest.setTimeout(10000)

const initializeResponse = jest.fn()
const response = jest.fn()
const api = graphql.link(process.env.REACT_APP_GRAPHQL_ENDPOINT!)
const server = setupServer(
  api.mutation('initialize', initializeResponse),
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
  initializeResponse.mockImplementation((req, res, ctx) => {
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
  response.mockImplementation((req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.data({
        villages: {
          totalItems: 111,
          items: [
            {
              id: '1',
              number: '1000',
              endDate: '2023-01-01T10:00:00Z',
              url: 'https://aaaa.com',
              name: '村名A',
              people: 10,
              cast: VillageCast.A,
              bans: [
                {
                  position: VillagePosition.Wolf,
                  trip: 'aaaa',
                },
              ],
            },
            {
              id: '2',
              number: '2000',
              endDate: '2023-02-01T11:00:00Z',
              url: 'https://bbb.com',
              name: '村名B',
              people: 8,
              cast: VillageCast.D,
              bans: [
                {
                  position: VillagePosition.Villager,
                  trip: 'bbb',
                },
                {
                  position: VillagePosition.Cat,
                  trip: 'ccc',
                },
              ],
            },
          ],
        },
      }),
    )
  })

  /*
   * When
   */
  const { container } = render('/dashboard')

  /*
   * Then
   */

  // AppBar 及び最近追加されたログが表示されること
  await waitFor(() => {
    expect(screen.queryByText('人狼通報ログまとめ')).toBeInTheDocument()
    expect(container.querySelectorAll('tbody tr').length).toBe(2)
  })

  /*
   * ある一定数まで待たせるといったことも可能
  await waitFor(() => expect(container.querySelector("#refreshHeaderIsPageLoding")).not.toBeInTheDocument(), {
    timeout: 3000
  })
  */

  // データが 2 件存在すること
  const trElements = container.querySelectorAll('tbody tr')
  expect(trElements.length).toBe(2)

  // データが正しく表示されていること
  const tdElements0 = trElements.item(0).querySelectorAll('td')
  expect(tdElements0[0].textContent).toBe('1000')
  expect(tdElements0[1].textContent).toBe('2023/01/01 10:00:00(日)')
  expect(tdElements0[2].textContent).toBe('村名A')
  expect(tdElements0[3].textContent).toBe('10A')
  expect(tdElements0[4].textContent).toBe('aaaa')
  expect(tdElements0[5].textContent).toBe('人狼')

  const tdElements1 = trElements.item(1).querySelectorAll('td')
  expect(tdElements1[0].textContent).toBe('2000')
  expect(tdElements1[1].textContent).toBe('2023/02/01 11:00:00(水)')
  expect(tdElements1[2].textContent).toBe('村名B')
  expect(tdElements1[3].textContent).toBe('8D')
  expect(tdElements1[4].textContent).toBe('bbbccc')
  expect(tdElements1[5].textContent).toBe('村人猫又')
})

test('Initialize エラー表示', async () => {
  /*
   * Given
   */
  initializeResponse.mockImplementation((req, res, ctx) => {
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
  render('/dashboard')

  /*
   * Then
   */

  // エラー画面が表示されていること
  await waitFor(() => {
    expect(screen.getByText(/Please reopen/)).toBeInTheDocument()
  })
})

// variable が変化しない都合上
// F5 での更新時に onError に来ない？ように見える。
// 仕様かもしれないので、挙動だけ覚えておく。
// ↑に付随し、テストも動作しない。
// test('listVillages エラー表示', async () => {
//   /*
//    * Given
//    */
//   initializeResponse.mockImplementation((req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.data({
//         initialize: {
//           id: 'bfd5677d-6ac6-49db-8904-bd65620785dd',
//           villageNumbers: [],
//         },
//       }),
//     )
//   })
//   response.mockImplementation((req, res, ctx) => {
//     return res(
//       ctx.status(500),
//       ctx.errors([
//         {
//           message: 'villages error',
//           extensions: {
//             code: 'BASE-0000',
//           },
//         },
//       ]),
//     )
//   })

//   /*
//    * When
//    */
//   render('/dashboard')

//   /*
//    * Then
//    */

//   // エラー画面が表示されていること
//   await waitFor(() => {
//     expect(screen.getByText(/Server unexpected/)).toBeInTheDocument()
//   })
// })

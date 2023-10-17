import { render, screen, waitFor } from '@testing-library/react'
import { FixedTable } from '../../../components/FixedTable'
import { ColumnDef } from '@tanstack/react-table'

type FixedTableData = {
  id: number
  value: string
}

describe('FixedTable', () => {
  const columns: ColumnDef<FixedTableData | any>[] = [
    {
      header: 'Id',
      size: 10,
      accessorKey: 'id',
    },
    {
      header: 'Value',
      accessorKey: 'value',
    },
  ]

  test('空データの場合', async () => {
    const { container } = render(
      <FixedTable<FixedTableData | any> data={[]} columns={columns} />,
    )

    // テーブルが表示されるまで待機する
    await waitFor(() => {
      expect(screen.queryByText('Id')).toBeInTheDocument()
      expect(screen.queryByText('Value')).toBeInTheDocument()
    })

    // データが一つも存在しないこと
    const dataElements = container.querySelectorAll('tbody tr')
    expect(dataElements.length).toBe(0)
  })

  test('データが 1 件の場合', async () => {
    const data: FixedTableData[] = [
      {
        id: 0,
        value: '0value',
      },
    ]

    const { container } = render(
      <FixedTable<FixedTableData | any> data={data} columns={columns} />,
    )

    // テーブルが表示されるまで待機する
    await waitFor(() => {
      expect(screen.queryByText('Id')).toBeInTheDocument()
      expect(screen.queryByText('Value')).toBeInTheDocument()
    })

    // データが一つ存在すること
    const trElements = container.querySelectorAll('tbody tr')
    expect(trElements.length).toBe(1)

    // データが正しく表示されていること
    const tdElements = trElements.item(0).querySelectorAll('td')
    expect(tdElements[0].textContent).toBe('0')
    expect(tdElements[1].textContent).toBe('0value')
  })

  test('データが複数件の場合', async () => {
    const data: FixedTableData[] = [
      {
        id: 0,
        value: '0value',
      },
      {
        id: 1,
        value: '1value',
      },
    ]

    const { container } = render(
      <FixedTable<FixedTableData | any> data={data} columns={columns} />,
    )

    // テーブルが表示されるまで待機する
    await waitFor(() => {
      expect(screen.queryByText('Id')).toBeInTheDocument()
      expect(screen.queryByText('Value')).toBeInTheDocument()
    })

    // データが一つ存在すること
    const trElements = container.querySelectorAll('tbody tr')
    expect(trElements.length).toBe(2)

    // データが正しく表示されていること
    const tdElements0 = trElements.item(0).querySelectorAll('td')
    expect(tdElements0[0].textContent).toBe('0')
    expect(tdElements0[1].textContent).toBe('0value')

    const tdElements1 = trElements.item(1).querySelectorAll('td')
    expect(tdElements1[0].textContent).toBe('1')
    expect(tdElements1[1].textContent).toBe('1value')
  })
})

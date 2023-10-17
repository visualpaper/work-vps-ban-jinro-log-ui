import {
  formatEndDate,
  toCastString,
  toPositionString,
} from '../../model/village'
import { VillageCast, VillagePosition } from '../../types/generated/query'

describe('toCastString', () => {
  class Fixture {
    public cast: VillageCast
    public expected: string

    constructor(cast: VillageCast, expected: string) {
      this.cast = cast
      this.expected = expected
    }
  }

  test.each([
    new Fixture(VillageCast.A, 'A'),
    new Fixture(VillageCast.B, 'B'),
    new Fixture(VillageCast.C, 'C'),
    new Fixture(VillageCast.D, 'D'),
  ])('theory', (fx) => {
    expect(toCastString(fx.cast)).toBe(fx.expected)
  })
})

describe('toPositionString', () => {
  class Fixture {
    public position: VillagePosition
    public expected: string

    constructor(position: VillagePosition, expected: string) {
      this.position = position
      this.expected = expected
    }
  }

  test.each([
    new Fixture(VillagePosition.Wolf, '人狼'),
    new Fixture(VillagePosition.Fanatic, '狂信者'),
    new Fixture(VillagePosition.Madman, '狂人'),
    new Fixture(VillagePosition.Fox, '妖狐'),
    new Fixture(VillagePosition.Apostate, '背徳者'),
    new Fixture(VillagePosition.Seer, '占い師'),
    new Fixture(VillagePosition.Medium, '霊能者'),
    new Fixture(VillagePosition.Hunter, '狩人'),
    new Fixture(VillagePosition.Cat, '猫又'),
    new Fixture(VillagePosition.Mason, '共有者'),
    new Fixture(VillagePosition.Villager, '村人'),
  ])('theory', (fx) => {
    expect(toPositionString(fx.position)).toBe(fx.expected)
  })
})

describe('formatEndDate', () => {
  test('formatEndDate - 正常系', () => {
    expect(formatEndDate('2020-10-14T16:28:05Z')).toBe(
      '2020/10/14 16:28:05(木)',
    )
  })

  test('formatEndDate - 異常系', () => {
    expect(() => formatEndDate('aaa')).toThrow(/Invalid time value/)
  })
})

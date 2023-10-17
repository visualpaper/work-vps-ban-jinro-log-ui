import { VillageCast, VillagePosition } from '../types/generated/query'

export const toCastString = (cast: VillageCast): string => {
  switch (cast) {
    case VillageCast.A:
      return 'A'
    case VillageCast.B:
      return 'B'
    case VillageCast.C:
      return 'C'
    case VillageCast.D:
      return 'D'

    // 発生しえないためエラーとしている。
    default:
      throw new Error('illegal state')
  }
}

export const toPositionString = (position: VillagePosition): string => {
  switch (position) {
    case VillagePosition.Wolf:
      return '人狼'
    case VillagePosition.Fanatic:
      return '狂信者'
    case VillagePosition.Madman:
      return '狂人'
    case VillagePosition.Fox:
      return '妖狐'
    case VillagePosition.Apostate:
      return '背徳者'
    case VillagePosition.Seer:
      return '占い師'
    case VillagePosition.Medium:
      return '霊能者'
    case VillagePosition.Hunter:
      return '狩人'
    case VillagePosition.Cat:
      return '猫又'
    case VillagePosition.Mason:
      return '共有者'
    case VillagePosition.Villager:
      return '村人'

    // 発生しえないためエラーとしている。
    default:
      throw new Error('illegal state')
  }
}

export const formatEndDate = (dateString: string): string => {
  const date = new Date(dateString)

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')} ${String(
    date.getUTCHours(),
  ).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(
    date.getUTCSeconds(),
  ).padStart(2, '0')}(${Intl.DateTimeFormat('ja-JP', {
    weekday: 'narrow',
  }).format(date)})`
}

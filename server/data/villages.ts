import { Village, VillageCast, VillagePosition } from '../types/generated/types'

export const villages = (): Village[] => {
  return [
    {
      id: '1',
      url: 'https://aaaa.com',
      name: '村名A',
      people: 10,
      cast: VillageCast.A,
      bans: [
        {
          position: VillagePosition.Villager,
          trip: 'aaaa',
        },
      ],
    },
    {
      id: '2',
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
  ]
}

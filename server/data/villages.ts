import { Village, VillageCast, VillagePosition } from '../types/generated/types'

export const villages = (): Village[] => {
  return [
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
          position: VillagePosition.Villager,
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
  ]
}

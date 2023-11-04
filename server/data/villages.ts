import { Village, VillageCast, VillagePosition } from '../types/generated/types'

export const create_village = (id: number): Village => {
  return {
    id: String(id),
    number: id,
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
  }
}

export const villages_before = (): Village[] => {
  return [...Array(100).keys()].map((v) => create_village(v))
}

export const villages_after = (): Village[] => {
  return [...Array(11).keys()].map((v) => create_village(v))
}

export const villages = (): Village[] => {
  return [
    {
      id: '1',
      number: 1000,
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
      number: 2000,
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
    {
      id: '3',
      number: 3000,
      endDate: '2023-03-01T10:00:00Z',
      url: 'https://cccc.com',
      name: '村名C',
      people: 16,
      cast: VillageCast.C,
      bans: [
        {
          position: VillagePosition.Fox,
          trip: 'cccc',
        },
      ],
    },
    {
      id: '4',
      number: 4100,
      endDate: '2023-04-01T10:00:00Z',
      url: 'https://dddd.com',
      name: '村名D',
      people: 21,
      cast: VillageCast.D,
      bans: [
        {
          position: VillagePosition.Madman,
          trip: 'ddd',
        },
      ],
    },
    {
      id: '5',
      number: 5555,
      endDate: '2023-05-01T10:00:00Z',
      url: 'https://eeee.com',
      name: '村名EEE',
      people: 8,
      cast: VillageCast.C,
      bans: [
        {
          position: VillagePosition.Hunter,
          trip: 'ee',
        },
      ],
    },
  ]
}

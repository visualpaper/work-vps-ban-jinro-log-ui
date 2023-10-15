export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Mutation = {
  __typename?: 'Mutation'
  initialize: User
}

export type Query = {
  __typename?: 'Query'
  villages: Array<Maybe<Village>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']['output']
  villageNumbers: Array<Maybe<Scalars['Int']['output']>>
}

export type Village = {
  __typename?: 'Village'
  bans: Array<VillageBans>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  people: Scalars['Int']['output']
  url: Scalars['String']['output']
}

export enum VillageBanPosition {
  Apostate = 'APOSTATE',
  Cat = 'CAT',
  Fanatic = 'FANATIC',
  Fox = 'FOX',
  Hunter = 'HUNTER',
  Madman = 'MADMAN',
  Mason = 'MASON',
  Medium = 'MEDIUM',
  Seer = 'SEER',
  Villager = 'VILLAGER',
  Wolf = 'WOLF',
}

export type VillageBans = {
  __typename?: 'VillageBans'
  position: VillageBanPosition
  trip: Scalars['String']['output']
}

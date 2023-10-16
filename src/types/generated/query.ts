import { GraphQLClient } from 'graphql-request';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  initialize: User;
};

export type Query = {
  __typename?: 'Query';
  villages: Array<Maybe<Village>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  villageNumbers: Array<Maybe<Scalars['Int']['output']>>;
};

export type Village = {
  __typename?: 'Village';
  bans: Array<VillageBans>;
  cast: VillageCast;
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
  people: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type VillageBans = {
  __typename?: 'VillageBans';
  position: VillagePosition;
  trip: Scalars['String']['output'];
};

export enum VillageCast {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum VillagePosition {
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
  Wolf = 'WOLF'
}

export type InitializeMutationVariables = Exact<{ [key: string]: never; }>;


export type InitializeMutation = { __typename?: 'Mutation', initialize: { __typename?: 'User', id: string, villageNumbers: Array<number | null> } };

export type ListVillagesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListVillagesQuery = { __typename?: 'Query', villages: Array<{ __typename?: 'Village', id: string, number: string, endDate: string, url: string, name: string, people: number, cast: VillageCast, bans: Array<{ __typename?: 'VillageBans', position: VillagePosition, trip: string }> } | null> };


export const InitializeDocument = `
    mutation initialize {
  initialize {
    id
    villageNumbers
  }
}
    `;
export const useInitializeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<InitializeMutation, TError, InitializeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<InitializeMutation, TError, InitializeMutationVariables, TContext>(
      ['initialize'],
      (variables?: InitializeMutationVariables) => fetcher<InitializeMutation, InitializeMutationVariables>(client, InitializeDocument, variables, headers)(),
      options
    );
export const ListVillagesDocument = `
    query listVillages {
  villages {
    id
    number
    endDate
    url
    name
    people
    cast
    bans {
      position
      trip
    }
  }
}
    `;
export const useListVillagesQuery = <
      TData = ListVillagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ListVillagesQueryVariables,
      options?: UseQueryOptions<ListVillagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListVillagesQuery, TError, TData>(
      variables === undefined ? ['listVillages'] : ['listVillages', variables],
      fetcher<ListVillagesQuery, ListVillagesQueryVariables>(client, ListVillagesDocument, variables, headers),
      options
    );

useListVillagesQuery.getKey = (variables?: ListVillagesQueryVariables) => variables === undefined ? ['listVillages'] : ['listVillages', variables];
;

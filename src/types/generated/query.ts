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

export type FeedbackInput = {
  address: Scalars['String']['input'];
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  initialize: User;
  sendFeedback?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationSendFeedbackArgs = {
  input: FeedbackInput;
};

export type Query = {
  __typename?: 'Query';
  villages: VillageResult;
};


export type QueryVillagesArgs = {
  input: VillagesInput;
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
  number: Scalars['Int']['output'];
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
  D = 'D',
  Z = 'Z'
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

export type VillageResult = {
  __typename?: 'VillageResult';
  items: Array<Maybe<Village>>;
  totalItems: Scalars['Int']['output'];
};

export type VillagesInput = {
  cast: Array<InputMaybe<VillageCast>>;
  people_max?: InputMaybe<Scalars['Int']['input']>;
  people_min?: InputMaybe<Scalars['Int']['input']>;
  position: Array<InputMaybe<VillagePosition>>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  trip?: InputMaybe<Scalars['String']['input']>;
};

export type SendFeedbackMutationVariables = Exact<{
  input: FeedbackInput;
}>;


export type SendFeedbackMutation = { __typename?: 'Mutation', sendFeedback?: boolean | null };

export type InitializeMutationVariables = Exact<{ [key: string]: never; }>;


export type InitializeMutation = { __typename?: 'Mutation', initialize: { __typename?: 'User', id: string, villageNumbers: Array<number | null> } };

export type ListVillagesQueryVariables = Exact<{
  input: VillagesInput;
}>;


export type ListVillagesQuery = { __typename?: 'Query', villages: { __typename?: 'VillageResult', totalItems: number, items: Array<{ __typename?: 'Village', id: string, number: number, endDate: string, url: string, name: string, people: number, cast: VillageCast, bans: Array<{ __typename?: 'VillageBans', position: VillagePosition, trip: string }> } | null> } };


export const SendFeedbackDocument = `
    mutation sendFeedback($input: FeedbackInput!) {
  sendFeedback(input: $input)
}
    `;
export const useSendFeedbackMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SendFeedbackMutation, TError, SendFeedbackMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SendFeedbackMutation, TError, SendFeedbackMutationVariables, TContext>(
      ['sendFeedback'],
      (variables?: SendFeedbackMutationVariables) => fetcher<SendFeedbackMutation, SendFeedbackMutationVariables>(client, SendFeedbackDocument, variables, headers)(),
      options
    );
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
    query listVillages($input: VillagesInput!) {
  villages(input: $input) {
    totalItems
    items {
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
}
    `;
export const useListVillagesQuery = <
      TData = ListVillagesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ListVillagesQueryVariables,
      options?: UseQueryOptions<ListVillagesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListVillagesQuery, TError, TData>(
      ['listVillages', variables],
      fetcher<ListVillagesQuery, ListVillagesQueryVariables>(client, ListVillagesDocument, variables, headers),
      options
    );

useListVillagesQuery.getKey = (variables: ListVillagesQueryVariables) => ['listVillages', variables];
;

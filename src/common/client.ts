import { GraphQLClient, ClientError } from 'graphql-request'
import { AppError } from './error'
import { ERROR_CODE } from './messages'
import {
  GraphQLError,
  GraphQLClientResponse,
} from 'graphql-request/build/esm/types'

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT as string

export const graphqlRequestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
  responseMiddleware: (response: GraphQLClientResponse<unknown> | Error) => {
    // 200 レスポンスでなく、かつ、data がない場合に ClientError になる。
    // その場合、ClientError の中にレスポンスが入っている。
    if (response instanceof ClientError) {
      const errors = response.response.errors

      // レスポンス内に Error もない (接続できない等) は Server Unexpected エラーとする。
      if (!errors) {
        throw new AppError(ERROR_CODE.SERVER_UNEXPECTED)
      }

      // レスポンス内の errors がある場合、Server 上で設定したコードがあれば、
      // それに該当したエラーを投げる。
      // ※ 複数存在する場合は最初のコードに該当するエラーを投げる。
      errors.forEach((error: GraphQLError) => {
        const code = error.extensions?.code
        if (!code) {
          return
        }

        throw new AppError(String(code), error)
      })

      // レスポンス内の errors があり、Server 上で設定したコードがなければ、
      // 予期せぬエラーとしてエラーを投げる。
      // ※ 複数存在する場合は最初のエラーを投げる。
      throw new AppError(ERROR_CODE.SERVER_UNEXPECTED, errors[0])
    }

    // 上記以外での、予期せぬエラーは ClientError とする。
    if (response instanceof Error) {
      throw new AppError(ERROR_CODE.CLIENT_ERROR, response)
    }
  },
})

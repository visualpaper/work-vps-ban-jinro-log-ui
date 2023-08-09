export const ERROR_CODE = {
  SERVER_UNEXPECTED: 'BASE-0000',
  CLIENT_ERROR: 'CLIENT_ERROR', // これは内部用
}

export const COMMON_MESSAGES = {
  SUCCESS_CREATE: 'Success create',
  SUCCESS_UPDATE: 'Success update',
  SUCCESS_DELETE: 'Success delete',
}

export const ERROR_MESSAGES = {
  [ERROR_CODE.SERVER_UNEXPECTED]: 'Server unexpected',
  [ERROR_CODE.CLIENT_ERROR]: 'Client Erorr',
}

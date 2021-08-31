export type serverInfo = {
  "instance_name": string,
  "user_count": string,
  "message_count": string,
  "admin": {
    "account": string,
    "mail": string
  },
  "tos": string,
  "privacy_policy": string
}

// APIのリクエストレスポンスの型

export type getServerInfoRes = serverInfo

//::::::::::::::::::::::::::::

export type postServerInfoReq = {
  "instance_name": string,
  "admin": {
    "account": string,
    "mail": string
  },
  "tos": string,
  "privacy_policy": string
}

export type postServerInfoRes = serverInfo

//::::::::::::::::::::::::::::

export type patchServerInfoReq = {
  "instance_name": string,
  "admin": {
    "account": string,
    "mail": string
  },
  "tos": string,
  "privacy_policy": string
}

export type patchServerInfoRes = {
  "instance_name": string,
  "admin": {
    "account": string,
    "mail": string
  },
  "tos": string,
  "privacy_policy": string
}

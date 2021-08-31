import { guild } from "./guild";

export type user = {
  "id": string,
  "name": string,
  "avatar": string,
  "bot": boolean,
  "state": number
}


// API リクエストレスポンスの型

export type getUserInfoRes = user

//:::::::::::::::::::::::::::::::::::::::::

export type patchUserInfoReq = {
  "name": string
}

export type patchUserInfoRes = {
  "user_id": string,
  "user_name": string,
  "user_avatar": string,
  "bot": boolean
}

//:::::::::::::::::::::::::::::::::::::::

export type postUserInfoReq = {
  "name": string,
  "password": string,
  "bot": boolean
}

export type postUserInfoRes = {
  "id": string,
  "bot": boolean,
  "name": string
}

//::::::::::::::::::::::::::::::::::::

export type getUsersInfoRes = user[]

//:::::::::::::::::::::::::::::::::::

export type getMyInfoRes = user & {"guild": guild[]};

//::::::::::::::::::::::::::::::::::

export type patchMyInfoReq = {
  "name": string
}

//::::::::::::::::::::::::::::::::

export type postCreateBotReq = {
  "description": string,
  "name": string
}

//:::::::::::::::::::::::::::::::

export type getBotListReq = {
  "id": string,
  "botUserId": string,
  "description": string,
  "owner": {
    "id": string,
    "name": string,
    "avatar": string,
    "bot": boolean,
    "state": number
  },
  "state": number,
  "created_at": string,
  "updated_at": string
}[]

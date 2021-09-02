import { guild } from "./guild";

export type user = {
  "id": string,
  "name": string,
  "avatar": string,
  "bot": boolean,
  "state": number
}

/

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

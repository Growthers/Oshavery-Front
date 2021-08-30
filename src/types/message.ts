export type message = {
  "id": string,
  "timestamp": string,
  "author": {
    "id": string,
    "user_name": string,
    "avatar": string,
    "bot": boolean,
    "state": number
  },
  "content": string,
  "guild_id": string,
  "channel_id": string,
  "edited_timestamp": string
}


// APIのリクエストレスポンスの型

export type postMessageReq = {
  "content": string
}

export type postMessageRes = {
  "id": string,
  "timestamp": string,
  "author": {
    "id": string,
    "user_name": string
  },
  "content": string,
  "guild_id": string,
  "edited_timestamp": string
}

//::::::::::::::::::::::::::::

export type getMassagesRes = message[]

//:::::::::::::::::::::::::::

export type getAMassageRes = message

//:::::::::::::::::::::::::::

export type putMassageContentReq = {
  "content": string
}

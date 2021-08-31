export type channel = {
  "id": string,
  "channel_name": string,
  "channel_topics": string,
  "channel_type": string,
  "channel_position": number,
  "creator_id": string,
  "permissions"?: permission[]
}

type permission = {
  "id": string,
  "name": string,
  "permissions": string,
  "mentionable": boolean
}

//APIのリクエストレスポンスの型

export type getChannelListRes = channel[]

//:::::::::::::::::::::::::

export type postCreateChannelReq = {
  "channel_name": string,
  "channel_topics": string,
  "channel_type": string,
  "channel_position": number
}

export type postCreateChannelRes = {
  "name": string,
  "type": number,
  "topic": string
}

//::::::::::::::::::::::

export type patchChannelReq = {
  "name": string,
  "position": number,
  "topic": string
}

export type patchChannelRes = channel

//::::::::::::::::::::::::::

export type getChanelPermissionsRes = permission[]

//::::::::::::::::::::::::::

export type postCreateChannelPermissionReq = {
  "name": string,
  "permissions": string,
  "mentionable": boolean
}

//::::::::::::::::::::::::::::

export type putChannelPermissionReq = {
  "name": string,
  "permission": string,
  "mentionable": boolean
}

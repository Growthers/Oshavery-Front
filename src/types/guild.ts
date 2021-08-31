import { user } from "./user";

export type guild = {
  "id": string,
  "name": string,
  "topic": string,
  "icon": string,
  "owner_id": string,
  "users": user[],
  "channels": {
    "id": string,
    "channel_name": string,
    "channel_topics": string,
    "channel_type": string,
    "channel_position": number,
    "creator_id": string
  }[]
}

export type role = {
  "id": string,
  "name": string
  "permissions": string,
  "mentionable": boolean
}

export type inviteLink = {
  "id": string,
  "guild_id": string,
  "channel_id": string,
  "expires_id": string
}

//APIのリクエスト・レスポンス

export type getGuildInfoRes = guild

//::::::::::::::::::::::::::::::::

export type patchGuildInfoReq = {
  "name": string,
  "icon": string,
  "owner_id": string
}

//::::::::::::::::::::::::::::::

export type getGuildRolesRes = role[]

//:::::::::::::::::::::::::::::

export type postCreateGuildRoleReq = {
  "name": string,
  "permissions": string,
  "mentionable": boolean
}

export type postGuildRoleRes = role

//:::::::::::::::::::::::::::::

export type patchGuildRoleReq = role

//:::::::::::::::::::::::::::::::

export type getGuildMembersRes = user[]

//::::::::::::::::::::::::::::::

export type getGuildMembersInfoRes = {
  "id": string,
  "name": string,
  "nick": string,
  "joined_at": string,
  "roles": role[]
}

//:::::::::::::::::::::::::::::

export type putGuildMemberInfoReq = {
  "nick": string
}

//::::::::::::::::::::::::::::::

export type getInviteLinkListRes = inviteLink[]

//:::::::::::::::::::::::::::::

export type postCreateInviteLinkReq = {
  "guild_id": string,
  "channel_id": string,
  "expires_at": string
}

export type postCreateInviteLinkRes = inviteLink

//::::::::::::::::::::::::::::

export type putInviteLinkReq = {
  "expires_at": string
}

export type putInviteLinkRes = inviteLink

//::::::::::::::::::::::::::::::

export type postCreateGuildReq = {
  "guild_name": string,
  "guild_topics": string
}

export type postCreateGuildRes = guild

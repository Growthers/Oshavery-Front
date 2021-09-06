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

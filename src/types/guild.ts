import { User } from "./user";

export type guild = {
  id: string;
  name: string;
  topic: string;
  icon: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  channels: {
    id: string;
    name: string;
    type: string;
    topics: string;
    position: number;
    latest_message_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    guildId: string;
  }[];
};

export type role = {
  id: string;
  name: string;
  permissions: string;
  mentionable: boolean;
};

export type inviteLink = {
  id: string;
  guild_id: string;
  channel_id: string;
  expires_id: string;
};

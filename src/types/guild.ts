import { User } from "./user";

export type Guild = {
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

export type Role = {
  id: string;
  name: string;
  permissions: string;
  mentionable: boolean;
};

export type InviteLink = {
  id: string;
  guild_id: string;
  channel_id: string;
  expires_id: string;
};

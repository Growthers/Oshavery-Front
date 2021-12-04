export type Message = {
  id: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avatarurl: string;
    bot: boolean;
    state: number;
  };
  content: string;
  guild_id: string;
  channel_id: string;
  edited_timestamp: string;
};

export type PostMessageRes = {
  id: string;
  timestamp: string;
  content: string;
  guild_id: string;
  edited_timestamp: Date;
};

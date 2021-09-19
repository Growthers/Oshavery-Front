export type message = {
  id: string;
  timestamp: string;
  author: {
    id: string;
    user_name: string;
    avatar: string;
    bot: boolean;
    state: number;
  };
  content: string;
  guild_id: string;
  channel_id: string;
  edited_timestamp: string;
};

export type postMessageRes = {
  id: string;
  timestamp: string;
  content: string;
  guild_id: string;
  edited_timestamp: Date;
};

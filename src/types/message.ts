export type message = {
  id: string;
  timestamp: Date;
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
  edited_timestamp: Date;
};

export type postMessageRes = {
  id: string;
  timestamp: Date;
  content: string;
  guild_id: string;
  edited_timestamp: Date;
};

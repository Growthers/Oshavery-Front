export type User = {
  id: string;
  name: string;
  avatar: string;
  bot: boolean;
  state: number;
};

export type CreateUserRes = {
  id: string;
  bot: boolean;
  name: string;
};

// export type myInfo = user & {"guilds": guild[]};

export type MyInfo = {
  id: string;
  name: string;
  avatar: string;
  bot: boolean;
  state: number;
  guilds: {
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
  }[];
};

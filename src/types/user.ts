export type user = {
  id: string;
  name: string;
  avatar: string;
  bot: boolean;
  state: number;
};

export type createUserRes = {
  id: string;
  bot: boolean;
  name: string;
};

//export type myInfo = user & {"guilds": guild[]};

export type myInfo = {
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
    channels: {
      id: string;
      channel_name: string;
      channel_topics: string;
      channel_type: string;
      channel_position: number;
      creator_id: string;
    }[];
  }[];
};

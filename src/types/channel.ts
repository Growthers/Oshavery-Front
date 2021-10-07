export type Channel = {
  id: string;
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
  creator_id: string;
  permissions?: Permission[];
};

export type Permission = {
  id: string;
  name: string;
  permissions: string;
  mentionable: boolean;
};

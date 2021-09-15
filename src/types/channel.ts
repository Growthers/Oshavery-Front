export type channel = {
  id: string;
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
  creator_id: string;
  permissions?: permission[];
};

export type permission = {
  id: string;
  name: string;
  permissions: string;
  mentionable: boolean;
};

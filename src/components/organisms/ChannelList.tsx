import React, {useContext} from "react";
import type { FC } from "react";

import ChannelCard from "../atoms/ChannelCard";

import {channel} from "../../types/channel";

import { TestGuildData, TestWatchingGuild} from "../../stores/__test__/guild";
import {guild} from "../../types/guild";


export type channelsData = {
  id: string,
  channel_name: string,
  channel_topics: string,
  channel_type: string,
  channel_position: number,
  creator_id: string,
  permissions: string[], //許されるロール
  parent?: string //カテゴリのUUID
};


const ChannelList: FC = React.memo(() => {
  const WatchingGuild: string = useContext(TestWatchingGuild)
  const guilds: guild[] = useContext(TestGuildData)

  const apiChannel: channel[] = guilds[guilds.findIndex(value => value.id === WatchingGuild)].channels

  return (
    <>
      {
        apiChannel.map((value => {
          return (
            <ChannelCard
              key={value.id}
              channel_name={value.channel_name}
              channel_topics={value.channel_topics}
              channel_type={value.channel_type}
            />
          );
        }))
      }
    </>

  );
});

export default ChannelList;

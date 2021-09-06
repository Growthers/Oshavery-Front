import React, { useContext } from "react";
import type { FC } from "react";

import ChannelCard from "../atoms/ChannelCard";
import NameCard from "../atoms/NameCard";

import { TestGuildData, TestWatchingGuild } from "../../stores/__test__/guild";

import { channel } from "../../types/channel";
import { guild } from "../../types/guild";

const ChannelList: FC = () => {
  const WatchingGuild: string = useContext(TestWatchingGuild);
  const guilds: guild[] = useContext(TestGuildData);

  const apiGuild: guild = guilds[guilds.findIndex(value => value.id === WatchingGuild)];
  const apiChannel: channel[] = apiGuild.channels;

  return (
    <>
      <NameCard name={apiGuild.name} />
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
};

export default React.memo(ChannelList);

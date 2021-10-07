import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";

import ChannelCard from "../atoms/ChannelCard";
import NameCard from "../atoms/NameCard";

import { Guild } from "../../types/guild";
import { userContext } from "../../stores/user";
import { useRouter } from "next/router";

import style from "../../styles/app_components/organisms/ChannelList.module.scss";

const ChannelList: FC = () => {
  const { userState } = useContext(userContext);

  const router = useRouter();
  const { guildID, channelID } = router.query;

  const [nowGuild, setNowGuild] = useState<Guild>();

  useEffect(() => {
    setNowGuild(userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)]);
  }, [userState, guildID]);

  if (nowGuild == undefined) return <></>;

  return (
    <div className={style.channellist}>
      <div className={style.guildname}>
        <NameCard name={nowGuild.name} />
      </div>
      <div className={style.channels}>
        {nowGuild.channels.map((value) => {
          return (
            <ChannelCard
              key={value.id}
              channel_name={value.name}
              channel_topics={value.topics}
              channel_type={value.type}
              link={`/guild/${guildID}/channel/${value.id}`}
              selected={value.id === channelID}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ChannelList);

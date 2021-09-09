import React, { useContext } from "react";
import type { FC } from "react";

import ChannelCard from "../atoms/ChannelCard";
import NameCard from "../atoms/NameCard";

import { guild } from "../../types/guild";
import {userContext} from "../../stores/user";
import {useRouter} from "next/router";

const ChannelList: FC = () => {

  const {userState, userDispatch} = useContext(userContext)
  const router = useRouter();
  const { guildID, channelID } = router.query

  const thisGuild = () => {
    if (userState.user != undefined){
      return userState.user.guild[userState.user.guild.findIndex(item => item.id === guildID)]
    } else {
      return {} as guild
    }
  }

    return (
    <>
      <NameCard name={thisGuild().name} />
      {
        thisGuild().channels.map((value => {
          return (
            <ChannelCard
              key={value.id}
              channel_name={value.channel_name}
              channel_topics={value.channel_topics}
              channel_type={value.channel_type}
              link={`/${guildID}/${value.id}`}
            />
          );
        }))
      }
    </>
  );
};

export default React.memo(ChannelList);

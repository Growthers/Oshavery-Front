import React from "react";
import type { FC } from "react";
import Link from "next/link";

import style from "../../styles/app_components/atoms/ChannelCard.module.scss";

type Props = {
  channel_name: string;
  channel_type: string;
  channel_topics: string;
  link: string;
  selected: boolean;
};

const ChannelCard: FC<Props> = (props) => {
  if (props.channel_type === "category") {
    return (
      <div className={style.category}>
        <p className={style.category_name}>{props.channel_name}</p>
      </div>
    );
  } else {
    return (
      <Link href={"/guild/[guildID]/channel/[channelID]"} as={props.link}>
        <a className={`${style.channel} ${props.selected&&style.selected}`}>
          {props.channel_name}
        </a>
      </Link>
    );
  }
};

export default React.memo(ChannelCard);

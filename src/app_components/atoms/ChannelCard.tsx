import React from "react";
import type { FC } from "react";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import style from "../../styles/app_components/atoms/ChannelCard.module.scss";

type Props = {
  channel_name: string;
  channel_type: string;
  //  未実装のためコメントアウト
  // ChannelTopics: string;
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
  }
  return (
    <Link href="/guild/[guildID]/channel/[channelID]" as={props.link}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a tabIndex={0} role="button" className={`${style.channel} ${props.selected ? style.selected : ""}`}>
        <FaHashtag className={style.sharp} />
        <span className={style.channel_name}>{props.channel_name}</span>
      </a>
    </Link>
  );
};

export default React.memo(ChannelCard);

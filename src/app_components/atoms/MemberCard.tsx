import React from "react";
import type { FC } from "react";
import Image from "next/image";

import MemberPopup from "./MemberPopup";

import style from "../../styles/app_components/atoms/MemberCard.module.scss";

type Props = {
  id: string;
  // element_id: string,
  name: string;
  avatar: string;
  bot: boolean;
  func_show_memberpopup: (target_id: string) => void;
};

const MemberCard: FC<Props> = (props) => (
  <div className={style.member_box}>
    <div
      className={`${style.member} member_element`}
      onClick={() => props.func_show_memberpopup(props.id)}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      <Image className={`${style.avatar} member_element`} src={props.avatar} alt={`${props.name}'s avatar`} />
      {!props.bot && <span className={`${style.name} member_element`}>{props.name}</span>}
      {props.bot && <span className={`${style.bot_name} member_element`}>{props.name}</span>}
      {props.bot && <span className={`${style.bot} member_element`}>BOT</span>}
    </div>
    <div className={style.memberpopup} id={props.id}>
      <MemberPopup name={props.name} avatar={props.avatar} bot={props.bot} />
    </div>
  </div>
);

export default React.memo(MemberCard);

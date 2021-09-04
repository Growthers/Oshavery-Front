import React from "react";
import type { FC } from "react";

import { MembersData } from "../organisms/MemberList";

import style from "../../styles/components/atoms/MemberPopup.module.scss";

type Props = Pick<
  MembersData,
  "name" | "avatar_url" | "bot"
>;

const MemberPopup: FC<Props> = props => {
  return (
    <div className={`${style.memberpopup} memberpopup_element`}>
      <div className={`memberpopup_element`}>
        <img className={`${style.avatar} memberpopup_element`} src={props.avatar_url}></img>
      </div>
      <span className={`${style.name} memberpopup_element`}>{props.name}</span>
      {props.bot && (<span className={`${style.bot} memberpopup_element`}>BOT</span>)}
    </div>
  )
};

export default React.memo(MemberPopup);

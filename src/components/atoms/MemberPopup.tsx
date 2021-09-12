import React from "react";
import type { FC } from "react";


import style from "../../styles/components/atoms/MemberPopup.module.scss";
import {user} from "../../types/user";

type Props = Pick<
  user,
  "name" | "avatar" | "bot"
>;

const MemberPopup: FC<Props> = props => {
  return (
    <div className={`${style.memberpopup} memberpopup_element`}>
      <div className={`memberpopup_element`}>
        <img className={`${style.avatar} memberpopup_element`} src={props.avatar}/>
      </div>
      <span className={`${style.name} memberpopup_element`}>{props.name}</span>
      {props.bot && (<span className={`${style.bot} memberpopup_element`}>BOT</span>)}
    </div>
  )
};

export default React.memo(MemberPopup);

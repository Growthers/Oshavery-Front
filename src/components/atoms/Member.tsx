import type { FC } from "react";

import { MembersData } from "../organisms/MemberList";

import style from "../../styles/components/atoms/Member.module.scss";

type Props = Pick<
  MembersData,
  "name" | "avatar_url" | "bot"
>;

const Member: FC<Props> = props => {
  return (
    <div className={style.member}>
      <img className={style.avatar} src={props.avatar_url}></img>
      {!props.bot && (<span className={style.name}>{props.name}</span>)}
      {props.bot && (<span className={style.bot_name}>{props.name}</span>)}
      {props.bot && (<span className={style.bot}>BOT</span>)}
    </div>
  )
};

export default Member;

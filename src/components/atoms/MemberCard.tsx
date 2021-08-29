import type { FC } from "react";

import { MembersData } from "../organisms/MemberList";

import style from "../../styles/components/atoms/MemberCard.module.scss";

type Props = Pick<
  MembersData,
  "name" | "avatar_url" | "bot"
>;

const MemberCard: FC<Props> = props => {
  return (
    <div className={`${style.membercard} membercard_element`}>
      <div className={style.membercard_element}>
        <img className={`${style.avatar} membercard_element`} src={props.avatar_url}></img>
      </div>
      <span className={`${style.name} membercard_element`}>{props.name}</span>
      {props.bot && (<span className={`${style.bot} membercard_element`}>BOT</span>)}
    </div>
  )
};

export default MemberCard;

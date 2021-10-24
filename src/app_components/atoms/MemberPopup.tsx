import React from "react";
import type { FC } from "react";
import Image from "next/image";

import style from "../../styles/app_components/atoms/MemberPopup.module.scss";
import { User } from "../../types/user";

type Props = Pick<User, "name" | "avatar" | "bot">;

const MemberPopup: FC<Props> = (props) => (
  <div className={`${style.memberpopup} memberpopup_element`}>
    <div className="memberpopup_element">
      <Image className={`${style.avatar} memberpopup_element`} src={props.avatar} />
    </div>
    <span className={`${style.name} memberpopup_element`}>{props.name}</span>
    {props.bot && <span className={`${style.bot} memberpopup_element`}>BOT</span>}
  </div>
);

export default React.memo(MemberPopup);

import React from "react";
import type { FC } from "react";
import Link from "next/link";

import { ServerData } from "../organisms/ServerList";

import style from "../../styles/components/atoms/ServerIcon.module.scss";

type Props = ServerData;

const ServerIcon: FC<Props> = props => {
  return (
    <div>
      <Link href={`/${props.id}/`}>
        <img className={style.icon} src={props.icon_url}></img>
      </Link>
      <p className={style.name}>{props.name}</p>
    </div>
  )
};

export default React.memo(ServerIcon);

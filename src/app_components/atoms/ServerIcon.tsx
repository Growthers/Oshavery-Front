import React from "react";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import style from "../../styles/app_components/atoms/ServerIcon.module.scss";

type Props = {
  name: string;
  icon: string;
  link: string;
};

const ServerIcon: FC<Props> = (props) => (
  <div className={style.servericon}>
    <Link href="/guild/[guildID]/channel/[channelID]" as={props.link} passHref>
      <Image className={style.icon} src={props.icon} />
    </Link>
    <p className={style.name}>{props.name}</p>
  </div>
);

export default React.memo(ServerIcon);

import React from "react"
import type { FC } from "react"
import Link from "next/link"

import style from "../../styles/components/atoms/ServerIcon.module.scss"

type Props = {
  id: string
  name: string
  icon: string
  link: string
}

const ServerIcon: FC<Props> = (props) => {
  return (
    <div>
      <Link href={"/guild/[guildID]/channel/[channelID]"} as={props.link}>
        <img className={style.icon} src={props.icon} />
      </Link>
      <p className={style.name}>{props.name}</p>
    </div>
  )
}

export default React.memo(ServerIcon)

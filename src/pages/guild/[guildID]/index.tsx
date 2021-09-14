import type { NextPage } from "next"
import { FC, useContext, useEffect } from "react"
import { userContext } from "../../../stores/user"
import { useRouter } from "next/router"

const Child: FC = () => {
  const router = useRouter()
  const { guildID } = router.query
  const { userState } = useContext(userContext)

  useEffect(() => {
    router.push(
      "/guild/[guildID]/channel/[channelID]",
      `/guild/${guildID}/channel/${
        userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels[0].id
      }`,
    )
  })

  return <>自動的にリダイレクトします</>
}

const Test: NextPage = () => {
  return <Child />
}

export default Test

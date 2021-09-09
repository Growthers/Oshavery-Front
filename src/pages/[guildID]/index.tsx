import type { NextPage } from 'next'
import {FC, useContext, useEffect } from "react";
import {userContext} from "../../stores/user";
import {useRouter} from "next/router";

const Child: FC = () => {
  const router = useRouter()

  const { guildID } = router.query

  const { userState } = useContext(userContext)

  const guildIndex = () => {
    if (userState.user != undefined) {
      return userState.user.guilds.findIndex(item => item.id === guildID)
    } else {
      return 0
    }
  }

  useEffect(() => {
    if (userState.user != undefined){
      router.push("/[guildID]/[channelID]", `/${guildID}/${userState.user.guilds[guildIndex()].channels[0]}`)
    } else {
      router.push("/")
    }
  })

  return (<>自動的にリダイレクトします</>)
}


const Test: NextPage = () => {
  return <Child/>
}

export default Test

import type { NextPage } from "next"
import Head from "next/head"
import { useState, useEffect } from "react"

import ServerList from "../../../../components/organisms/ServerList"
import ChannelList from "../../../../components/organisms/ChannelList"
import MessageList from "../../../../components/organisms/MessageList"
import InputMessageBox from "../../../../components/organisms/InputMessageBox"
import MemberList from "../../../../components/organisms/MemberList"

import style from "../../../../styles/pages/guild-channel.module.scss"

const Oshavery: NextPage = () => {
  const [messages_height, setMessagesHeight] = useState<number>(937)

  useEffect(() => {
    if (process.browser) {
      setMessagesHeight(window.innerHeight)
    }
    change_messages_height()
  }, [])

  const change_messages_height = () => {
    if (process.browser) {
      const input_target = document.getElementById("input_box")
      if (input_target == null) return

      const input_height = input_target.clientHeight
      const height = window.innerHeight - input_height

      setMessagesHeight(height)
    }
  }

  return (
    <>
      <Head>
        <title>{`Oshavery`}</title>
      </Head>
      <main className={style.oshavery}>
        <div className={style.server_list}>
          <img className={style.icon} src="oshavery.svg" />
          <ServerList />
        </div>
        <div className={style.left_side}>
          <ChannelList />
        </div>
        <div className={style.center}>
          {/*ここで高さを変更*/}
          <div
            className={style.messages}
            style={{
              height: messages_height,
            }}
          >
            <MessageList />
          </div>
          <div className={style.input} id="input_box">
            <InputMessageBox textarea_change_event={change_messages_height} />
          </div>
        </div>
        <div className={style.right_side}>
          <MemberList />
        </div>
      </main>
    </>
  )
}

export default Oshavery

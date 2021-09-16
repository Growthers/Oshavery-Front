import type { NextPage } from "next";
import image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
//import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";

import ServerList from "../../../../app_components/organisms/ServerList";
import ChannelList from "../../../../app_components/organisms/ChannelList";
import MessageList from "../../../../app_components/organisms/MessageList";
import InputMessageBox from "../../../../app_components/organisms/InputMessageBox";
import MemberList from "../../../../app_components/organisms/MemberList";
import style from "../../../../styles/pages/guild-channel.module.scss";

const Oshavery: NextPage = () => {
  const { width: window_width, height: window_height } = useWindowSize();
  const [messages_height, setMessagesHeight] = useState<number>(937);

  useEffect(() => {
    if (process.browser) {
      setMessagesHeight(window.innerHeight);
    }
    change_messages_height();
  }, []);

  // ウィンドウサイズ変更
  useEffect(() => {
    change_messages_height();
  }, [window_width, window_height]);

  // メッセージリストの高さ変更
  const change_messages_height = () => {
    if (process.browser) {
      const input_target = document.getElementById("input_box");
      if (input_target == null) return;

      const input_height = input_target.clientHeight;
      const set_height = window.innerHeight - input_height;

      setMessagesHeight(set_height);
    }
  };

  return (
    <>
      <Head>
        <title>{`Oshavery`}</title>
      </Head>
      <main className={style.oshavery}>
        <div className={style.server_list}>
          <img className={style.icon} src="https://media.oshavery-app.net/logos/logo.png" />
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
  );
};

export default Oshavery; // withPageAuthRequired(Oshavery);

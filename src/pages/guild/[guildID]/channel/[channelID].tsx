import type { NextPage } from "next";
import { useState, useEffect, useContext } from "react";
import { useWindowSize } from "react-use";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Layout from "../../../../components/Layout";

import ServerList from "../../../../app_components/organisms/ServerList";
import ChannelList from "../../../../app_components/organisms/ChannelList";
import MessageList from "../../../../app_components/organisms/MessageList";
import InputMessageBox from "../../../../app_components/organisms/InputMessageBox";
import MemberList from "../../../../app_components/organisms/MemberList";
import UserStatus from "../../../../app_components/organisms/UserStatus";
import UserSettings from "../../../../app_components/organisms/UserSettings";

import WebSocketController from "../../../../lib/WebSocketController";

import style from "../../../../styles/pages/guild-channel.module.scss";
import { userContext } from "../../../../stores/user";
import { client } from "../../../../lib/client";
import { myInfo } from "../../../../types/user";

const Oshavery: NextPage = () => {
  const { width: window_width, height: window_height } = useWindowSize();
  const [messages_height, setMessagesHeight] = useState<number>(937);
  const [modalIsShow, setModalShow] = useState<boolean>(false);
  const { userState, userDispatch } = useContext(userContext);

  useEffect(() => {
    if (process.browser) {
      setMessagesHeight(window.innerHeight);
    }
    change_messages_height();

    if (!userState) {
      client
        .get<myInfo>("/users/me")
        .then((res) => {
          userDispatch({
            type: "set",
            newData: res.data,
          });
        })
        .catch((error) => {});
    }
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
    <Layout pagetitle={`Oshavery`} isheader={false} isfooter={false}>
      <div className={style.oshavery}>
        <div className={style.server_list}>
          <img className={style.icon} src="https://media.oshavery-app.net/logos/logo.png" />
          <ServerList />
        </div>
        <div className={style.left_side}>
          <div className={style.userstatus}>
            {/* ユーザー部に要素を追加する場合はここに入れる */}
            <UserStatus onClick={setModalShow} modalIsShow={modalIsShow} />
          </div>
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
      </div>
      <UserSettings onClick={setModalShow} isShow={modalIsShow} />
      <WebSocketController />
    </Layout>
  );
};

export default withAuthenticationRequired(Oshavery);

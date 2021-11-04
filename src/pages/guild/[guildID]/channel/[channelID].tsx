import type { NextPage } from "next";
import { useState, useEffect, useContext } from "react";
import { useWindowSize } from "react-use";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";

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
import client from "../../../../lib/client";
import { MyInfo } from "../../../../types/user";

const logo = "https://media.oshavery-app.net/logos/logo.png";

const Oshavery: NextPage = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [messagesHeight, setMessagesHeight] = useState<number>(937);
  const [modalIsShow, setModalShow] = useState<boolean>(false);
  const { userDispatch } = useContext(userContext);

  // メッセージリストの高さ変更
  const changeMessagesHeight = () => {
    if (process.browser) {
      const inputTarget = document.getElementById("input_box");
      if (inputTarget == null) return;

      const inputHeight = inputTarget.clientHeight;
      const setHeight = window.innerHeight - inputHeight;

      setMessagesHeight(setHeight);
    }
  };

  useEffect(() => {
    if (process.browser) {
      setMessagesHeight(window.innerHeight);
    }
    changeMessagesHeight();

    client
      .get<MyInfo>("users/me")
      .then((res) => {
        userDispatch({
          type: "set",
          newData: res.data,
        });
      })
      .catch(() => {});
  }, [userDispatch]);

  // ウィンドウサイズ変更
  useEffect(() => {
    changeMessagesHeight();
  }, [windowWidth, windowHeight]);

  return (
    <Layout pagetitle="Oshavery">
      <div className={style.oshavery}>
        <div className={style.server_list}>
          <Image className={style.icon} src={logo} alt="logo" />
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
          {/* ここで高さを変更 */}
          <div
            className={style.messages}
            style={{
              height: messagesHeight,
            }}
          >
            <MessageList />
          </div>
          <div className={style.input} id="input_box">
            <InputMessageBox textareaChangeEvent={changeMessagesHeight} inputDisable={false} />
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

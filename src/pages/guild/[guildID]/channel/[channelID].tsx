import type { NextPage } from "next";
import Head from "next/head";

import ServerList from "../../../../components/organisms/ServerList";
import ChannelList from "../../../../components/organisms/ChannelList";
import MessageList from "../../../../components/organisms/MessageList";
import InputMessageBox from "../../../../components/organisms/InputMessageBox";
import MemberList from "../../../../components/organisms/MemberList";

import style from "../../../../styles/pages/guild-channel.module.scss";

const Oshavery: NextPage = () => {
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
        <div className={style.messages}>
          <MessageList />
        </div>
        <div className={style.input}>
          <InputMessageBox />
        </div>
        <div className={style.right_side}>
          <MemberList />
        </div>
      </main>
    </>
  );
};

export default Oshavery;

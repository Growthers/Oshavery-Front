import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useContext, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { client } from "../lib/client";
import { useRouter } from "next/router";
import { userContext } from "../stores/user";
import { myInfo, user } from "../types/user";

const Loading: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { userDispatch } = useContext(userContext);

  useEffect(() => {
    //Oshaveryのuidをcookie(auth0)から読み取る
    const OshaveryUID = "";
    (async () => {
      try {
        //アカウントあり
        const me = await client.get<user>(`/users/${OshaveryUID}`);

        //JWTまち

        const myInfo = await client.get<myInfo>("/users/me");
        userDispatch({
          type: "set",
          newData: myInfo.data,
        });

        await router.push({
          pathname: "/guild/[guildID]/channel/[channelID]",
          query: {
            guildID: myInfo.data.guilds[0].id,
            channelID: myInfo.data.guilds[0].channels[0].id,
          },
        });
      } catch (e) {
        //アカウント作成ページへとばすなど
      }
    })();
  }, [router, userDispatch]);

  return <div className={styles.container}>Loading</div>;
};

export default Loading;

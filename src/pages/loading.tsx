import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { client } from "../lib/client";
import { useRouter } from "next/router";
import { userContext } from "../stores/user";
import { createUserRes, myInfo } from "../types/user";

import logo from "../../public/logo.png";
import style from "../styles/pages/loading.module.scss";

const Loading: NextPage = () => {
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();
  const { userDispatch } = useContext(userContext);

  useEffect(() => {
    (async () => {
      try {
        const jwt = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_APIENDPOINT,
          scope: "read:all",
        });
        client.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const myInfo = await client.get<myInfo>("/users/me");

        console.log(myInfo.data)

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
        console.log(e);
        try {
          const user = await client.post<createUserRes>("/users");
          const myInfo = await client.get("/users/me");

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
          console.log(e);
          await router.push("/").catch((error) => {
            console.log(error);
          });
        }
      }
    })();
  }, [router, userDispatch]);

  return (
    <div className={style.loading}>
      <div className={style.logo}>
        <Image src={logo} alt="Oshavery logo" />
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;

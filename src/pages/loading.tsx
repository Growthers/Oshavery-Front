import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useRouter } from "next/router";
import client from "../lib/client";
import { userContext } from "../stores/user";
import { CreateUserRes, MyInfo } from "../types/user";

import logo from "../../public/logo.png";
import style from "../styles/pages/loading.module.scss";

const Loading: NextPage = () => {
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();
  const { userDispatch } = useContext(userContext);

  const createUser = async (): Promise<MyInfo> => {
    try {
      await client.post<CreateUserRes>("/users");
    } catch (e) {
      throw new Error("failed to create User");
    }

    try {
      const res = await client.get<MyInfo>("/users/me");
      return res.data;
    } catch (e2) {
      throw new Error("failed to get myInfo");
    }
  };

  useEffect(() => {
    const routing = async (): Promise<MyInfo> => {
      try {
        const jwt = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_APIENDPOINT,
          scope: "read:all",
        });
        client.defaults.headers += { Authorization: `Bearer ${jwt}` };
      } catch (e) {
        throw new Error("auth0 error");
      }

      try {
        const res = await client.get<MyInfo>("/users/me");
        userDispatch({
          type: "set",
          newData: res.data,
        });
        return res.data;

        /*  以下、ユーザー情報取得失敗時  */
      } catch (e2) {
        try {
          const res = await createUser();
          userDispatch({
            type: "set",
            newData: res,
          });
          return res;
        } catch (e3) {
          /*  ユーザー作成・作成したユーザー情報取得失敗  */
          throw new Error(e3);
        }
      }
    };

    routing()
      .then((value) => {
        router
          .push({
            pathname: "/guild/[guildID]/channel/[channelID]",
            query: {
              guildID: value.guilds[0].id,
              channelID: value.guilds[0].channels[0].id,
            },
          })
          .catch(() => {});
      })
      .catch(() => {
        router.push("/").catch(() => {});
      });
  }, [getAccessTokenSilently, router, userDispatch]);

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

import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { client } from "../lib/client";
import { useRouter } from "next/router";
import { userContext } from "../stores/user";
import { myInfo } from "../types/user";

const Loading: NextPage = () => {
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();
  const { userDispatch } = useContext(userContext);

  useEffect(() => {
    (async () => {
      try {
        const jwt = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_APIENDPOINT + "/",
          scope: "read:all"
        });

        client.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

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
        console.log(e)
        router.push("/").catch((e) => {console.log(e)})
      }
    })();
  }, [router, userDispatch]);

  return <h1>Loading</h1>;
};

export default Loading;

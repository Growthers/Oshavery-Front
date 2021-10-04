import type { NextPage } from "next";
import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { userContext } from "../../../stores/user";

const Child: FC = () => {
  const router = useRouter();
  const { guildID } = router.query;
  const { userState } = useContext(userContext);

  useEffect(() => {
    if (typeof guildID === "string")
      router
        .push(
          "/guild/[guildID]/channel/[channelID]",
          `/guild/${guildID}/channel/${
            userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels[0].id
          }`,
        )
        .catch(() => {});
  });

  return <>自動的にリダイレクトします</>;
};

const Test: NextPage = () => <Child />;

export default Test;

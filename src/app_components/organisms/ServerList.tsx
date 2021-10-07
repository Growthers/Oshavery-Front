import React, { useContext } from "react";
import type { FC } from "react";

import ServerIcon from "../atoms/ServerIcon";
import { userContext } from "../../stores/user";

import style from "../../styles/app_components/organisms/ServerList.module.scss";

const ServerList: FC = () => {
  const { userState } = useContext(userContext);

  const guildsData = userState.user.guilds;

  if (guildsData === undefined) return <></>;

  return (
    <div className={style.serverlist}>
      {guildsData.map((value) => (
        <ServerIcon
          key={value.id}
          id={value.id}
          name={value.name}
          icon={value.icon}
          link={`/guild/${value.id}/channel/${value.channels[0].id}`}
        />
      ))}
    </div>
  );
};

export default React.memo(ServerList);

import React from "react";
import { FC } from "react";

import ServerIcon from "../atoms/ServerIcon";

export type ServerData = {
  id: string,
  name: string,
  icon_url: string
};

const servers_data: ServerData[] = []

const ServerList: FC = () => {
  return (
    <div>
      {
        servers_data.map((value) => {
          return (
            <ServerIcon
              key={value.id}
              id={value.id}
              name={value.name}
              icon_url={value.icon_url}
            />
          )
        })
      }
    </div>
  )
};

export default React.memo(ServerList);


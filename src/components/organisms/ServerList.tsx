import React from "react";
import { FC } from "react";

import ServerIcon from "../atoms/ServerIcon";

export type ServerData = {
  id: string,
  name: string,
  icon_url: string
};

const servers_data: ServerData[] = [
  {
    id: "aaa",
    name: "Server 1",
    icon_url: "https://cdn.pixabay.com/photo/2014/07/29/06/41/polar-bear-404314_960_720.jpg"
  },
  {
    id: "bbb",
    name: "Server 2",
    icon_url: "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
  },
  {
    id: "ccc",
    name: "Server 3",
    icon_url: "https://cdn.pixabay.com/photo/2015/05/15/14/47/computer-768696_960_720.jpg"
  }
]

const ServerList: FC = React.memo(() => {
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
});

export default ServerList;


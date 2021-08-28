import type { FC } from "react";

import Member from "../atoms/Member";

export type MembersData = {
  id: string,
  name: string,
  avatar_url: string,
  bot: boolean
}

const members_data: MembersData[] = []

const MemberList: FC = () => {
  return (
    <div>
      {
        members_data.map((value => {
          return (
            <Member name={value.name} avatar_url={value.avatar_url} bot={value.bot} />
          )
        }))
      }
    </div>
  )
}

export default MemberList;

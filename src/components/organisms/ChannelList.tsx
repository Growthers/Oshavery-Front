import type { FC } from "react";
import ChannelCard from "../atoms/ChannelCard";


export type channelsData = {
  id: string,
  channel_name: string,
  channel_topics: string,
  channel_type: string,
  channel_position: number,
  creator_id: string,
  permissions: string[],//許されるロール
  parent?: string//カテゴリのUUID
};

const apiChannel: channelsData[] = [
  {
    id: "114514",
    channel_name: "aaa",
    channel_topics: "aaa is aaa",
    channel_type: "category",
    channel_position: 1,
    creator_id: "810",
    permissions: ["1"],
    parent: "1"
  },
  {
    id: "4",
    channel_name: "aaa",
    channel_topics: "aaa is aaa",
    channel_type: "text",
    channel_position: 1,
    creator_id: "810",
    permissions: ["1"],
    parent: "1"
  },
  {
    id: "1919810",
    channel_name: "aaa",
    channel_topics: "aaa is aaa",
    channel_type: "text",
    channel_position: 1,
    creator_id: "810",
    permissions: ["1"],
  }
];

const ChannelList: FC = () => {


  return (
    <>
      {
        apiChannel.map((value => {
          return (
            <ChannelCard
              key={value.id}
              channel_name={value.channel_name}
              channel_topics={value.channel_topics}
              channel_type={value.channel_type}
              parent={value.parent}
            />
          );
        }))
      }
    </>

  );
}

export default ChannelList;

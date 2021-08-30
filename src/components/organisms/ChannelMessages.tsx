import { FC, useState } from 'react'

import ChannelMessage from '../molecules/ChannelMessage'
import InfiniteScroll from 'react-infinite-scroller'

interface Response {
  id: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avator: string;
    bot: string;
    state: string;
  };
  content: string;
  guild_id: string;
  channel_id: string;
};

const ChannelMessages: FC = () => {
  const [messages, setMessages] = useState<JSX.Element[]>([])

  const loadMore = (p: number) => {
    const response: Response = {
      id: "test_id" + p.toString(),
      timestamp: "test_timestamp",
      author: {
        id: "test_author_id",
        name: "test_author_name",
        avator: "test_author_name",
        bot: "test_author_bot",
        state: "test_author_state",
      },
      content: "test_content",
      guild_id: "test_guild_id",
      channel_id: "test_channnel_id",
    };
    setMessages([...messages, <ChannelMessage response={response}></ChannelMessage>]);
  }

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {messages.map((i, j) => (<div key={j.toString()}>{i}</div>))}
      </InfiniteScroll>
    </>
  )

}

export default ChannelMessages

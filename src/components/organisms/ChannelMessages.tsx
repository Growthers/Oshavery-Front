import { FC, useState, useEffect } from 'react'

import ChannelMessage from '../molecules/ChannelMessage'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface Response {
  id: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bot: string;
    state: string;
  };
  content: string;
  guild_id: string;
  channel_id: string;
};

const ChannelMessages: FC = () => {
  const [messages, setMessages] = useState<Response[]>([])

  useEffect(() => { setMessages(Array.from({ length: 20 }, (_, i) => (
              {
                id: "test_id",
                timestamp: "test_timestamp",
                author: {
                  id: "test_author_id",
                  name: "test_author_name" + i.toString(),
                  avatar: "test_author_name",
                  bot: "test_author_bot",
                  state: "test_author_state",
                },
                content: "test_content",
                guild_id: "test_guild_id",
                channel_id: "test_channnel_id",
              }
            )))}, [])

  const fetchMoreData = () => {
    // 参照を置いているだけ
    setMessages([...messages,
        {
          id: "test_id",
          timestamp: "test_timestamp",
          author: {
            id: "test_author_id",
            name: "test_author_name" + (messages.length-1).toString(),
            avatar: "test_author_name",
            bot: "test_author_bot",
            state: "test_author_state",
          },
          content: "test_content",
          guild_id: "test_guild_id",
          channel_id: "test_channnel_id",
        }
    ]);
  }

  return (
    <>
      <div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {messages.map((value, i) => (<div key={i}><ChannelMessage response={value}></ChannelMessage></div>))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default ChannelMessages

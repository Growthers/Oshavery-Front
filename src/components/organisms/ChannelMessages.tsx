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

const response: Response = {
  id: "test_id",
  timestamp: "test_timestamp",
  author: {
    id: "test_author_id",
    name: "test_author_name",
    avatar: "test_author_name",
    bot: "test_author_bot",
    state: "test_author_state",
  },
  content: "test_content",
  guild_id: "test_guild_id",
  channel_id: "test_channnel_id",
};


const ChannelMessages: FC = () => {
  const [messages, setMessages] = useState<Response[]>([])

  useEffect(() => { setMessages(Array.from({ length: 20 }, (i, _) => (response)))}, [])

  const fetchMoreData = () => {
    // 参照を置いているだけ
    setMessages([...messages, response]);
  }

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={true}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((value, i) => (<div key={i}><ChannelMessage response={value}></ChannelMessage></div>))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default ChannelMessages

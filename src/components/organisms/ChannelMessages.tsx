import { FC, useState, useEffect } from 'react'

import ChannelMessage from '../molecules/ChannelMessage'

import InfiniteScroll from 'react-infinite-scroll-component'

import MarkdownIt from "markdown-it"
// import MarkdownItKatex from "markdown-it-katex"

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

const mkTestResponse = (authN: string): Response => {
  const ret: Response = {
    id: "test_id",
    timestamp: new Date().getTime().toString(),
    author: {
      id: "test_author_id",
      name: "NAME: " + authN,
      avatar: "test_author_name",
      bot: "test_author_bot",
      state: "test_author_state",
    },
    content: "test_content",
    guild_id: "test_guild_id",
    channel_id: "test_channnel_id",
  }
  const t = [
    "**HELLO**",
    "__UNKO__",
    "# TEST",
    ":+1: vote",
    "$\\sqrt{3x-1}+(1+x)^2$",
    "<h1>UNKOWORLD</h1>",
    "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";\n alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--\n ></SCRIPT>\">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>",
    "'';!--\"<XSS>=&{()}",
  ]
  ret.content = t[Math.floor(Math.random() * t.length)]
  return ret
}

const ChannelMessages: FC = () => {
  const [messages, setMessages] = useState<Response[]>([])

  // 初期化処理
  useEffect(() => {
    // テストデータを20件追加
    setMessages(Array.from({ length: 20 }, (_, i) => (mkTestResponse(i.toString()))))
  }, [])

  const fetchMoreData = () => {
    // 参照を置いているだけ
    setMessages([...messages, ...Array.from({ length: 20 }, (_, i) => (mkTestResponse((i+messages.length).toString())))]);
  }

  const md = new MarkdownIt({
    html: false,
  })
  // md.use(MarkdownItKatex)

  return (
    <>
      <div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {/* メッセージの一覧を表示 */}
          {messages.map((value, i) => (<div key={i}><ChannelMessage response={value} renderer={md.render.bind(md)}></ChannelMessage></div>))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default ChannelMessages

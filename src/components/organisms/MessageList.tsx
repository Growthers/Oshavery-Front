import { FC, useState, useEffect } from 'react'

import ChannelMessage from '../molecules/ChannelMessage'

import InfiniteScroll from 'react-infinite-scroll-component'

// Markdown描画用コンポーネント
import MarkdownIt from "markdown-it"
import MarkdownItEmoji from 'markdown-it-emoji'
// KaTeXレンダコンポーネント
// XSSの脆弱性があるらしいが、markdown-itの力で消えている
// @ts-ignore
import MarkdownItKatex from 'markdown-it-katex'
// Emojiレンダリングコンポーネント
// お願い！握りつぶさせて！
// @ts-ignore
import { Emoji } from 'emoji-mart'
// ここまでMarkdown

// サーバからのレスポンス
// props経由で渡されてる
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

// APIが無いからテスト用にResponseを返す
// XSSのテスト用文字列もあるよ
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
    "$\\sqrt{3x-1}+(1+x)^2$ テスト数式",
    "<h1>UNKOWORLD</h1> <- This is html tag",
    "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";\n alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--\n ></SCRIPT>\">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>",
    "'';!--\"<XSS>=&{()}",
    ":tada: fasldjflajsdlfl",
    "<script>alert(1)</script>"
  ]
  ret.content = t[Math.floor(Math.random() * t.length)]
  return ret
}

// コンポーネント本体
// Markdownレンダリングのライブラリのインスタンスもここで持っている
const MessageList: FC = () => {
  // Response型の配列
  const [messages, setMessages] = useState<Response[]>([])

  // 初期化処理
  useEffect(() => {
    // テストデータを20件追加
    // 初めに出てくるデータはここで作られている
    setMessages(Array.from({ length: 20 }, (_, i) => (mkTestResponse(i.toString()))))
  }, [])

  // 新規スクロールがあった時に呼ばれる
  // 複数件のメッセージを同時に取得したほうがいいとおもう
  const fetchMoreData = () => {
    setMessages([...messages, ...Array.from({ length: 20 }, (_, i) => (mkTestResponse((i+messages.length).toString())))]);
  }

  // Markdown-itのインスタンスを作成しています
  // このインスタンスは全てのメッセージのレンダリングに使われます
  // 現在はpropsで参照を渡していますがグローバルなstateにつっこんだ方がいいとおもう
  const md = new MarkdownIt({
    // デフォルトでfalseですが、念のため
    // markdown-it側である程度のサニタイズ処理は施されるようです
    html: false,
  })
  // 数式の描画(インラインにできないのかな？
  md.use(MarkdownItKatex)
  // 絵文字の描画
  // emoji-martライブラリのカスタム絵文字を使うために面倒なことをしています
  md.use(MarkdownItEmoji)
  md.renderer.rules.emoji = function(token, idx) {
    // EmojiコンポーネントがJSXかStringを返すクソ仕様のせいでtypescriptの恩恵を受けられません
    var ret = Emoji({
      html: true,
      emoji: token[idx].markup,
      size: 16
    })
    return ret as string;
  };

  return (
    <>
      {/* お行儀悪い 正々堂々と読み込んで */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
      <div>
        <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
        </script>
        {/*
        dataLength: メッセージの個数
        next: 新規データ(遡る)読み込みのための関数
        hasMore: 新規データを読み込むか(最後まで遡ったらfalseに設定しましょう
        loader: ロード中に表示される(カッコイイのに設定してください
        */}
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {/*
            メッセージの一覧を表示
            全部divにしてますがなんとなくです
          */}
          {messages.map((value, i) => (<div key={i}><ChannelMessage response={value} renderer={md.render.bind(md)}></ChannelMessage></div>))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default MessageList

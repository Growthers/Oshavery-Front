import { FC, useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

// Markdown描画用コンポーネント
import MarkdownIt from "markdown-it";
import MarkdownItEmoji from "markdown-it-emoji";
// KaTeXレンダコンポーネント
// XSSの脆弱性があるらしいが、markdown-itの力で消えている
// => ライブラリを変更することで解決
// @ts-ignore
import MarkdownItKatex from "@iktakahiro/markdown-it-katex";
// Emojiレンダリングコンポーネント
// お願い！握りつぶさせて！
// @ts-ignore
import { Emoji } from "emoji-mart";
import HighlightJs from "highlight.js";
// ここまでMarkdown

import ChannelMessage from "../molecules/ChannelMessage";
import ChannelName from "../atoms/ChannelName";

import { userContext } from "../../stores/user";
import { messagesContext } from "../../stores/message";
import { message } from "../../types/message";
import { client } from "../../lib/client";

import style from "../../styles/app_components/organisms/MessageList.module.scss";

// テスト用文字列
const mkTestResponse = (authN: string): message => {
  const ret: message = {
    id: Math.random().toString(32).substring(2),
    timestamp: new Date().getTime().toString(),
    author: {
      id: "test_author_id",
      name: "NAME: " + authN,
      avatarurl: "url",
      bot: false,
      state: 0,
    },
    content: "test_content",
    guild_id: "test_guild_id",
    channel_id: "test_channel_id",
    edited_timestamp: new Date().getTime().toString(),
  };
  const t = [
    "**HELLO**",
    "__HOGE__",
    "# TEST",
    ":+1: vote",
    "$\\sqrt{3x-1}+(1+x)^2$ テスト数式",
    "<h1>HOGEWORLD</h1> <- This is html tag",
    "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";\n alert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--\n ></SCRIPT>\">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>",
    "'';!--\"<XSS>=&{()}",
    ":tada: fasldjflajsdlfl",
    "<script>alert(1)</script>",
  ];
  ret.content = t[Math.floor(Math.random() * t.length)];
  return ret;
};

// コンポーネント本体
// Markdownレンダリングのライブラリのインスタンスもここで持っている
const MessageList: FC = () => {
  const { userState } = useContext(userContext);
  const { messagesState, messagesDispatch } = useContext(messagesContext);

  const user_id = userState.user.id;
  const router = useRouter();
  const { guildID, channelID } = router.query;
  const [endPoint, setEndPoint] = useState<string>();

  // 初期化処理
  useEffect(() => {
    (async () => {
      try {
        if (channelID == undefined) {
          throw new Error("no query");
        }
        const fstData = await client.get<message[]>(`/channels/${channelID}/messages`, {
          params: {
            limit: 100,
          },
        });

        messagesDispatch({
          type: "set",
          newData: fstData.data,
        });
      } catch (e) {
        console.log(e);
      }
    })();

    // テストデータ
    // テストデータを使うことがあるのでコメントアウトしておきます
    /*
    messagesDispatch({
      type: "set",
      newData: Array.from({ length: 100 }, (_, i) => mkTestResponse(i.toString())),
    });
    */

    setEndPoint(`/channels/${channelID}/messages`);
  }, [channelID]);

  // 新規スクロールがあった時に呼ばれる
  const fetchMoreData = async () => {
    try {
      if (endPoint == undefined) {
        throw new Error("no query");
      }
      const lastID = messagesState.messages.slice(-1)[0].id;
      const newData = await client.get<message[]>(endPoint, {
        params: {
          limit: 100,
          before: lastID,
        },
      });
      messagesDispatch({
        type: "load",
        newData: newData.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Markdown-itのインスタンスを作成しています
  // このインスタンスは全てのメッセージのレンダリングに使われます
  // 現在はpropsで参照を渡していますがグローバルなstateにつっこんだ方がいいとおもう
  const md = new MarkdownIt({
    // デフォルトでfalseですが、念のため
    // markdown-it側である程度のサニタイズ処理は施されるようです
    html: false,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && HighlightJs.getLanguage(lang)) {
        try {
          return HighlightJs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  });

  // 数式の描画
  md.use(MarkdownItKatex);

  // 絵文字の描画
  // emoji-martライブラリのカスタム絵文字を使うために面倒なことをしています
  md.use(MarkdownItEmoji);

  md.renderer.rules.emoji = function (token, idx) {
    // EmojiコンポーネントがJSXかStringを返すクソ仕様のせいでtypescriptの恩恵を受けられません
    var ret = Emoji({
      html: true,
      emoji: token[idx].markup,
      size: 16,
    });
    // @ts-ignore
    return ret as string;
  };

  // aタグを新規タブで開くように
  // ここを参考に https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex("target");

    let result = null;

    if (process.browser && aIndex < 0) {
      const pattern = `https?://${document.domain}[\w!?/+\-_~;.,*&@#$%()'[\]]+`;
      // url取得
      // ここで一致させることで、同一ドメインのものは新規タブで開かれません（多分）
      // result = tokens[idx].attrs[0][1].match(pattern);
    }

    if (aIndex < 0 && result == null) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  if (messagesState.messages == undefined || channelID == undefined || guildID == undefined) return <></>;

  // 同一ユーザーによる連続投稿のカウント
  let countup = 0;

  return (
    <div className={style.messagelist}>
      {/* お行儀悪い 正々堂々と読み込んで */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/xcode.min.css" />
      <div className={style.channelname}>
        <ChannelName
          name={
            userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels[
              userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels.findIndex(
                (item) => item.id === channelID,
              )
            ].name
          }
        />
      </div>
      <div
        id="scrollableDiv"
        className={style.messages}
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {/*
        dataLength: メッセージの個数
        next: 新規データ(遡る)読み込みのための関数
        hasMore: 新規データを読み込むか(最後まで遡ったらfalseに設定しましょう
        loader: ロード中に表示される(カッコイイのに設定してください

        その他は以下を参照
        https://github.com/ankeetmaini/react-infinite-scroll-component#using-scroll-on-top
        */}
        <InfiniteScroll
          dataLength={messagesState.messages.length}
          next={fetchMoreData}
          style={{ display: "flex", flexDirection: "column-reverse", overflow: "hidden" }}
          inverse={true}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {/*
            メッセージの一覧を表示
            全部divにしてますがなんとなくです
          */}
          {messagesState.messages
            .slice()
            .reverse()
            .map((value, index) => {
              // index0が最新
              const messages_array = messagesState.messages;
              let author_show = true;

              // 配列の最後かどうか
              if (index + 1 !== messages_array.length) {
                // 一つ前のデータ
                const before_value = messages_array[index + 1];

                // 一つ前のメッセージの送信者が異なる
                if (value.author.id != before_value.author.id) {
                  countup = 0;
                }
                // 一つ前のメッセージが5分以内に送信されていない
                else if (Number(value.timestamp) - Number(before_value.timestamp) >= 5 * 60000) {
                  countup = 0;
                }
                // 既に5件連続になっている
                else if (countup >= 5) {
                  countup = 0;
                }
                // 連読処理
                else {
                  countup++;
                  author_show = false;
                }
              }

              let isauthor = false;

              // 作成者が本人かどうか
              if (value.author.id == user_id) isauthor = true;

              return (
                <ChannelMessage
                  key={value.id}
                  response={value}
                  author_show={author_show}
                  isauthor={isauthor}
                  renderer={md.render.bind(md)}
                />
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MessageList;

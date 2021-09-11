import React from "react";
import type { FC } from "react";

import MessageContent from "../atoms/MessageContent"
// Responseの型はMessageListから輸入しています
import { Response } from "../organisms/MessageList";

interface Props {
  response: Response;
  renderer: (content: string) => string;
};

const ChannelMessage: FC<Props> = props => {
  // 表示の仕方はまだ未実装
  const r: Response = props.response
  const author_avatar: string = r.author.avatar
  const author_name = r.author.name
  const timestamp = r.timestamp

  // dangerousな文字をHTMLにして表示してるの怖くね
  return (
    <div>
      <img src={author_avatar} alt={author_name + "'s avatar"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      {/* Markdown描画部 */}
      <div><MessageContent content={r.content} renderer={props.renderer}></MessageContent></div>
    </div>
  )
}

export default React.memo(ChannelMessage)

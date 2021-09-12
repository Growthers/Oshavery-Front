import React from "react";
import type {FC} from "react";

import MessageContent from "../atoms/MessageContent"
import {message} from "../../types/message";
// Responseの型はMessageListから輸入しています
//import { Response } from "../organisms/MessageList";

interface Props {
  response: message;
  renderer: (content: string) => string;
}

const ChannelMessage: FC<Props> = props => {
  // 表示の仕方はまだ未実装
  const r: message = props.response
  const author_avatar: string = r.author.avatar
  const author_name = r.author.user_name
  const timestamp = r.timestamp

  // dangerousな文字をHTMLにして表示してるの怖くね
  return (
    <div>
      <img src={author_avatar} alt={author_name + "'s avatar"}/>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      {/* Markdown描画部 */}
      <div><MessageContent content={r.content} renderer={props.renderer}/></div>
    </div>
  )
}

export default React.memo(ChannelMessage)

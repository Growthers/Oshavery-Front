import React from "react";
import type { FC } from "react";

import { Response } from "../organisms/MessageList";

interface Props {
  response: Response;
  renderer: (content: string) => string;
};



const ChannelMessage: FC<Props> = props => {
  const r: Response = props.response
  const author_avatar: string = r.author.avatar
  const author_name = r.author.name
  const timestamp = r.timestamp
  const renderdContent = props.renderer(r.content)

  // dangerousな文字をHTMLにして表示してるの怖くね
  return (
    <div style={{border: "solid"}}>
      <img src={author_avatar} alt={author_name + "'s avatar"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      <div><span dangerouslySetInnerHTML={{__html: renderdContent}}></span></div>
    </div>
  )
}

export default React.memo(ChannelMessage)

import React from "react";
import type { FC } from "react";

import { Response } from "../organisms/MessageList";

interface Props {
  response: Response;
};

const ChannelMessage: FC<Props> = React.memo((props) => {
  const r: Response = props.response
  const author_avatar: string = r.author.avatar
  const author_name = r.author.name
  const timestamp = r.timestamp
  const content = r.content

  return (
    <>
      <img src={author_avatar} alt={author_name + "'s avatar"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      <div>{content}</div>
    </>
  )
})

export default ChannelMessage

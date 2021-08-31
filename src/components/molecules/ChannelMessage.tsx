import React from "react";
import type { FC } from "react";

import { Response } from "../organisms/ChannelMessages";

interface Props {
  response: Response;
};

const ChannelMessage: FC<Props> = React.memo((props) => {
  const r: Response = props.response
  const author_avator: string = r.author.avator
  const author_name = r.author.name
  const timestamp = r.timestamp
  const content = r.content

  return (
    <div>
      <img src={author_avator} alt={author_name + "'s avatar"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      <div>{content}</div>
    </div>
  )
})

export default ChannelMessage

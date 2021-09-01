import React from "react";
import type { FC } from "react";
import ReactMarkdown from "react-markdown"

import { Response } from "../organisms/ChannelMessages";

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
    <div style={{border: "solid"}}>
      <img src={author_avatar} alt={author_name + "'s avatar"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      <div><ReactMarkdown>{content}</ReactMarkdown></div>
    </div>
  )
})

export default ChannelMessage

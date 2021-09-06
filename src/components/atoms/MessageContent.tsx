import React from "react"
import type { FC } from "react"

interface Props {
  content: string;
  renderer: (content: string) => string;
};

const MessageContent: FC<Props> = props => {
  const renderdContent = props.renderer(props.content)
  return (
    <span dangerouslySetInnerHTML={{__html: renderdContent}}></span>
  )
}

export default React.memo(MessageContent)

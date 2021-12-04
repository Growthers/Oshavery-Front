import React from "react";
import type { FC } from "react";

// Markdown部分を描画するコンポーネント
// レンダリングの関数は外で定義されているので現在ファイルを分ける以上のメリットはない

interface Props {
  content: string;
  renderer: (content: string) => string;
}

const MessageContent: FC<Props> = (props) => {
  const renderdContent = props.renderer(props.content);
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: renderdContent }} />;
};
export default React.memo(MessageContent);

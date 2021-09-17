import React, { FC } from "react";
import Image from "next/image";
type FileProps = {
  name: string;
  mime: string;
  media_url: string;
  width?: number;
  height?: number;
};

const FileContent: FC<FileProps> = (props) => {
  if ("image/png" == props.mime || "image/jpeg" == props.mime || "image/gif" == props.mime) {
    return (
      <a href={props.media_url} style={{ backgroundColor: "gray" }}>
        {/*heightの上限値を 決める必要あり widthも同様 css側でどうにかしてください*/}
        <Image src={props.media_url} width={props.width} height={props.height} alt={props.name} objectFit="contain" />
      </a>
    );
  } else if ("video/mp4" == props.mime) {
    return (
      <video controls width={props.width}>
        <source src={props.media_url} type={"video/mp4"}></source>
      </video>
    );
  } else {
    return <a href={props.media_url}>{props.name}</a>;
  }
};

export default React.memo(FileContent);

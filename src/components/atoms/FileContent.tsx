import React, { FC } from "react";
import Image from "next/image";
type FileProps = {
  name: string;
  mime: string;
  size: number;
  media_url: string;
  width: number;
  height: number;
};

const FileContent: FC<FileProps> = (props) => {
  if ("image/png" == props.mime || "image/jpeg" == props.mime) {
    return (
      <Image
        src={props.media_url}
        width={props.width}
        height={props.height}
        alt={props.name}
      />
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

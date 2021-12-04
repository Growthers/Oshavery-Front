import React, { FC } from "react";
import Image from "next/image";

type FileProps = {
  name: string;
  mime: string;
  media_url: string;
  width: number;
  height: number;
};

const FileContent: FC<FileProps> = (props) => {
  if (props.mime !== null) {
    return <></>;
  }
  if (props.mime === "image/png" || props.mime === "image/jpeg" || props.mime === "image/gif") {
    return (
      <a href={props.media_url} style={{ backgroundColor: "gray" }}>
        {/* heightの上限値を 決める必要あり widthも同様 css側でどうにかしてください */}
        <Image src={props.media_url} width={props.width} height={props.height} alt={props.name} objectFit="contain" />
      </a>
    );
  }
  if (props.mime === "video/mp4") {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video controls width={props.width} height={props.height}>
        <source src={props.media_url} type="video/mp4" />
      </video>
    );
  }
  return <a href={props.media_url}>{props.name}</a>;
};

export default React.memo(FileContent);

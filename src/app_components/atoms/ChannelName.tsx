import type { FC } from "react";
import { FaHashtag } from "react-icons/fa";
import style from "../../styles/app_components/atoms/ChannelName.module.scss";
type Props = {
  name: string;
};
const ChannelName: FC<Props> = (props) => {
  return (
    <div className={style.channelName}>
      <FaHashtag />
      <p>{props.name}</p>
    </div>
  );
};
export default ChannelName;

import type { FC } from "react";
import { FaHashtag } from "react-icons/fa";
import style from "../../styles/app_components/atoms/ChannelName.module.scss";

type Props = {
  name: string;
};

const ChannelName: FC<Props> = (props) => {
  return (
    <div className={style.namebar}>
      <FaHashtag className={style.sharp} />
      <h3 className={style.channelName}>{props.name}</h3>
    </div>
  );
};

export default ChannelName;

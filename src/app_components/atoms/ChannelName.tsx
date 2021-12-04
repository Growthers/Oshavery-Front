import type { FC } from "react";
import { FaHashtag } from "react-icons/fa";
import style from "../../styles/app_components/atoms/ChannelName.module.scss";

type Props = {
  name: string;
};

const ChannelName: FC<Props> = (props) => (
  <div className={style.namebar}>
    <FaHashtag className={style.sharp} />
    <h3 className={style.channelName}>{props.name}</h3>
    <span className={style.warning}>
      申し訳ありません. 開発中のため, メッセージを更新するためには戻るボタンを押してください.
    </span>
  </div>
);

export default ChannelName;

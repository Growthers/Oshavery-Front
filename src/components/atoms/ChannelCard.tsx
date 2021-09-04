import React from "react";
import type { FC } from "react";

import { channel } from "../../types/channel";

import style from "../../styles/components/atoms/ChannelCard.module.scss";

type Props = Pick<channel,
  "channel_name"|
  "channel_topics"|
  "channel_type"
  >


const ChannelCard: FC<Props> = props => {

  if (props.channel_type === "category") {
    return (
      <div className={style.category}>
        <p className={style.category_name}>{props.channel_name}</p>
      </div>
    );
  } else {
    return (
      <div className={style.channel}>
          <div className={style.sharp}>
            <i className={`${style.one_i} ${style.one}`}/>
            <i className={`${style.one_i} ${style.two}`}/>
            <i className={`${style.one_i} ${style.three}`}/>
            <i className={`${style.one_i} ${style.four}`}/>
          </div>
          {props.channel_name}
      </div>
    );
  }
};

export default React.memo(ChannelCard);

import type { FC } from "react";

import { channelsData } from "../organisms/ChannelList";

import '../../styles/components/atoms/ChannelCard.module.scss';

type Props = Pick<channelsData, 'channel_name'| 'channel_topics'| 'channel_type'| 'parent'>


const ChannelCard: FC<Props> = (props) => {



  return (
    <div className="accordion_one">
      <div className="accordion_header">
        <div className="i_box" >
          <i className="one_i one"/>
          <i className="one_i two"/>
          <i className="one_i three"/>
          <i className="one_i four"/>
        </div>
      </div>
      {props.channel_name}
    <div className="accordion_inner">
      <div className="box_one">
        <p className="txt_a_ac">aa</p>
      </div>
    </div>
  </div>
  );
}

export default ChannelCard;

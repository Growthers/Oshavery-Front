import type { FC } from "react";

import { channelsData } from "../organisms/ChannelList";

import style from '../../styles/components/atoms/ChannelCard.module.scss';

type Props = Pick<channelsData,
  'channel_name'|
  'channel_topics'|
  'channel_type'|
  'parent'
  > & {
  "state": string
}


const ChannelCard: FC<Props> = props => {
  if (props.channel_type === "category") {
    return (<>wow</>);
  } else {

    const isOpen: boolean = props.state === "open";

    return (
      <div className={style.accordion_one}>
        <div className={`${style.accordion_header}  ${isOpen && style.open}`}>
          <div className={style.i_box} >
            <i className={`${style.one_i} ${style.one}`}/>
            <i className={`${style.one_i} ${style.two}`}/>
            <i className={`${style.one_i} ${style.three}`}/>
            <i className={`${style.one_i} ${style.four}`}/>
          </div>
          {props.channel_name}
        </div>

        <div className={style.accordion_inner}>
          <div className={style.box_one}>
            <p className={style.txt_a_ac}>aa</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelCard;

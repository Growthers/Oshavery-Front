import React from "react";
import type { FC } from "react";

import MessageContent from "../atoms/MessageContent";
import { message } from "../../types/message";

import style from "../../styles/app_components/molecules/ChannelMessage.module.scss";

interface Props {
  response: message;
  // author情報を表示するか
  author_show: boolean;
  renderer: (content: string) => string;
}

const ChannelMessage: FC<Props> = (props) => {
  const res: message = props.response;
  const author_avatar: string = res.author.avatar;
  const author_name = res.author.user_name;

  const datetime = new Date(Number(res.timestamp));

  // 今日ですか？
  const istoday = (date: Date) => {
    const today = new Date();
    let result = false;

    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() == today.getMonth() &&
      date.getDay() == today.getDay()
    ) {
      result = true;
    }

    return result;
  };

  // 昨日ですか？
  const isyesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let result = false;

    if (
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() == yesterday.getMonth() &&
      date.getDay() == yesterday.getDay()
    ) {
      result = true;
    }

    return result;
  };

  // 一昨日ですか？
  const is2daysago = (date: Date) => {
    const todaysago = new Date();
    todaysago.setDate(todaysago.getDate() - 2);
    let result = false;

    if (
      date.getFullYear() === todaysago.getFullYear() &&
      date.getMonth() == todaysago.getMonth() &&
      date.getDay() == todaysago.getDay()
    ) {
      result = true;
    }

    return result;
  };

  // 今年ですか？
  const isthisyear = (date: Date) => {
    const today = new Date();
    let result = false;

    if (date.getFullYear() === today.getFullYear()) {
      result = true;
    }

    return result;
  };

  // ゼロ埋め関数
  const fillzero = (num: number, digit: number) => {
    return `${"0".repeat(digit)}${num}`.slice(-1 * digit);
  };

  const time = `${fillzero(datetime.getHours(), 2)}:${fillzero(datetime.getMinutes(), 2)}`;
  let timestamp = time;
  if (istoday(datetime)) timestamp = `今日 ${time}`;
  else if (isyesterday(datetime)) timestamp = `昨日 ${time}`;
  else if (is2daysago(datetime)) timestamp = `一昨日 ${time}`;
  else if (isthisyear(datetime))
    timestamp = `${fillzero(datetime.getMonth() + 1, 2)}/${fillzero(datetime.getDate(), 2)} ${time}`;
  else
    timestamp = `${fillzero(datetime.getFullYear(), 4)}/${fillzero(datetime.getMonth() + 1, 2)}/${fillzero(
      datetime.getDate(),
      2,
    )} ${time}`;

  // dangerousな文字をHTMLにして表示してるの怖くね
  if (props.author_show) {
    return (
      <div className={style.fullcontent}>
        <div className={style.left_side}>
          <img className={style.image} src={author_avatar} alt={author_name + "'s avatar"} />
        </div>
        <div>
          <div>
            <span className={style.name}>{author_name}</span>
            <span className={style.timestamp}>{timestamp}</span>
          </div>
          {/* Markdown描画部 */}
          <div>
            <MessageContent content={res.content} renderer={props.renderer} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.simplecontent}>
        <div className={style.left_side}>
          <span className={style.timestamp}>{time}</span>
        </div>
        {/* Markdown描画部 */}
        <div>
          <MessageContent content={res.content} renderer={props.renderer} />
        </div>
      </div>
    );
  }
};

export default React.memo(ChannelMessage);

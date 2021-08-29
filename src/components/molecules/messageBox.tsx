import type { FC } from "react";
//import style from "../../styles/components/atoms/messageBox.scss";
import SendButton  from "../atoms/sendButton.tsx";
import inputMessageBox  from "../atoms/textareaBox.tsx";
import {useEffect, useState} from "react";


export type channeData = {
  id: string,
  channel_name: string,
  channel_topics: string,
  channel_type: string,
  channel_position: number,
  creator_id: string,
  permissions: string[],
  parent?: string
}

export type setTextarea = {
  channelName: string; //placeholder
  autoFocus: boolean;
  disabled: boolean;
  rows: number;
  culs: number;
  maxlength: number;
  minlength: number;
};

export type useSetTextarea = Pick<channeData,
  'id' |
  'channel_name' |
  ''




const messageBox: FC<Props> = (props) => {
  let value: string = "";
  return (
    <inputMessageBox inputedText="value"
      channelName="にゃんぱす"
      autoFocus="true"
      disabled="false"
      rows="20"
      culs="30"

    />

  );
};

export default messageBox;

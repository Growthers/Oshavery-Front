import { FC } from "react";
import style from '../../styles/components/molecules/MessageBox.module.scss';
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import {  useState } from "react";

export type channeData = {
  id: string;
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
  creator_id: string;
  permissions: string[];
  parent?: string;
};

export type setTextarea = {
  onChange: VoidFunction;
  disabled: boolean;
  cols: number;
  rows: number;
};


const MessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(true);
  const [cols, setCols] = useState<number>(100);
  const [rows, setRows] = useState<number>(50);

  let inputedMessage = "";
  const channel_name = "無法地帯";
  return (
    <div className={style.messageBox}>
      <TextareaBox
        disabled={disabled}
        cols={cols}
        rows={rows}
        onChange={(mesage: string) => (inputedMessage = mesage)}
        placeholder={channel_name}
      />

      <SendButton
        onClick={() => {
          console.log(inputedMessage);
        }}
      />
    </div>
  );
};

export default MessageBox;

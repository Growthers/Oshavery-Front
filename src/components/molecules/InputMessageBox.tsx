import { FC, useRef } from "react";
import style from "../../styles/components/molecules/InputMessageBox.module.scss";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import { useState } from "react";

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

const InputMessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(100);
  const [rows, setRows] = useState<number>(50);
  const [placeholder, setPlaceholder] = useState<string>("無法地帯");

  const HTMLTextAreaElement = useRef<HTMLTextAreaElement>(null);
  let inputedMessage = "";

  const TextareaProps = {
    disabled: disabled,
    cols: cols,
    rows: rows,
    onChange: (message: string) => (inputedMessage = message),
    placeholder: placeholder,
  };

  return (
    <div className={style.messageBox}>
      <TextareaBox {...TextareaProps} ref={HTMLTextAreaElement} />
      <SendButton
        onClick={() => {
          //API待ち
          console.log(inputedMessage);
          //割と不味いと思われる
          HTMLTextAreaElement.current.value = "";
        }}
      />
    </div>
  );
};

export default InputMessageBox;

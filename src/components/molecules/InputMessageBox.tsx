import { FC, useRef } from "react";
import style from "../../styles/components/molecules/InputMessageBox.module.scss";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import { useState } from "react";

const InputMessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(100);
  const [rows, setRows] = useState<number>(50);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClick = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className={style.messageBox}>
      <TextareaBox
        disabled={disabled}
        cols={cols}
        rows={rows}
        onChange={(value) => setMessage(value)}
        placeholder={placeholder}
        value={message}
      />
      <SendButton onClick={handleClick} />
    </div>
  );
};

export default InputMessageBox;

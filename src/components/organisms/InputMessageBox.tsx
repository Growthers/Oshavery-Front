import style from "../../styles/components/organisms/InputMessageBox.module.scss";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import { FC, useState } from "react";
import { client } from "../../lib/client";
import { postMessageRes } from "../../types/message";
import { useRouter } from "next/router";

const InputMessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(100);
  const [rows, setRows] = useState<number>(50);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const {channelID} = router.query

  const sendMessage = () => {
    client.post<postMessageRes>(`/channels/${channelID}/messages`)
      .then(res => {
        setMessage("")
      })
      .catch(error => {

      })
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
        onKeyDown={sendMessage}
      />
      <SendButton onClick={sendMessage} />
    </div>
  );
};

export default InputMessageBox;

import { FC, useState, ChangeEvent, useCallback } from "react";
import { EmojiData, CustomEmoji } from "emoji-mart";
import { useRouter } from "next/router";

import EmojiPicker from "../molecules/EmojiPicker";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import UploadButton from "../atoms/UploadButton";

import { client } from "../../lib/client";
import { postMessageRes } from "../../types/message";

import style from "../../styles/components/organisms/InputMessageBox.module.scss";

const InputMessageBox: FC = () => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(100);
  const [rows, setRows] = useState<number>(50);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isShow, setIsShow] = useState(false);

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

  const sendFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.table(e);
  };
  const selectEmoji = (e: EmojiData) => {
    console.table(e);
  };

  //test Data
  const customEmojiData: CustomEmoji[] = [];

  const [uploadOnchange, setUploadOnchange] = useState<File>();

  return (
    <div className={style.messageBox}>
      <UploadButton onChange={sendFile} />
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
      <EmojiPicker
        onSelect={selectEmoji}
        color={"#FFC266"}
        custom={customEmojiData}
      />
    </div>
  );
};

export default InputMessageBox;

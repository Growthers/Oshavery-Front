import style from "../../styles/components/organisms/InputMessageBox.module.scss";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
import UploadButton from "../atoms/UploadButton";
import { FC, useState, ChangeEvent, useCallback } from "react";
import EmojiPicker from "../molecules/EmojiPicker";
import { EmojiData, CustomEmoji } from "emoji-mart";
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

  // Emoji Picker のクリア
  const clear_emojipopup = useCallback(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName();
      for (let i = 0; i < elements.length; i++) {
        elements[i].className =
      }

        setIsShow(false);
    }
  }, []);

  //クリックイベント
  const check_click = (e: any)=> {
    const class_name = String(e.target.className);

    if (class_name.indexOf("emoji_element") !== -1) {
      return;
    }else if (class_name.indexOf("emojipopup_element") !== -1) {
      return;
    }else if (!isShow) {
      return;
    }else {
      clear_emojipopup();
    }


  };

  if(process.browser){
    document.body.onClick = check_click;
  }
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

import { FC, useState, ChangeEvent, useEffect } from "react";
import { CustomEmoji, BaseEmoji } from "emoji-mart";
import { useRouter } from "next/router";

import EmojiPicker from "../molecules/EmojiPicker";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
// import UploadButton from "../atoms/UploadButton";

import client from "../../lib/client";
import { PostMessageRes } from "../../types/message";

import style from "../../styles/app_components/organisms/InputMessageBox.module.scss";

type Props = {
  textarea_change_event: () => void;
};

const InputMessageBox: FC<Props> = (props) => {
  // API待ち
  const [disabled, setDisabled] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const { channelID } = router.query;

  const sendMessage = () => {
    if (channelID !== undefined && !Array.isArray(channelID)) {
      client
        .post<PostMessageRes>(`/channels/${channelID}/messages`, {
          content: message,
        })
        .then(() => {
          setMessage("");
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  // ファイル関連
  const [eventtarget, setEventTarget] = useState<ChangeEvent<HTMLInputElement>>();
  const [filename, setFileName] = useState<string>("");
  const [fileurl, setFileUrl] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const checkfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    if (files == null) return;
    const file = files[0];
    if (file == null) return;
    console.log(file);
    const filesize = file.size;

    // 最大ファイルサイズ(MB)
    const max = 200;
    const maxSize = max * 1048576;

    if (filesize > maxSize) {
      target.value = "";
      return;
    }

    setEventTarget(e);
    setFileName(file.name);

    if (process.browser) {
      const blobUrl = window.URL.createObjectURL(file);
      setFileUrl(blobUrl);
    }

    // ポップアップでのチェックが実装できてないので
    // そのまま送信します
    setIsSending(true);

    setIsShow(true);
  };

  useEffect(() => {
    if (eventtarget == null) {
      setIsShow(false);
      return;
    }

    // 送信拒否
    if (!isSending) {
      eventtarget.target.value = "";
      setIsShow(false);
      return;
    }

    // 送信処理
    console.log("Sending");

    setIsShow(false);
    setIsSending(false);
  }, [eventtarget, isSending]);

  // 絵文字の入力
  const selectEmoji = (e: BaseEmoji) => {
    console.log(e.id);
    setMessage(`${message}:${e.id}:`);

    // 折り返しに対応 バグがあるので見送り
    // if (process.browser) {
    //  const target = document.getElementById("input_your_message") as HTMLInputElement;
    //  if (target == null) return;

    //  target.style.height = "auto";
    //  if (message == "") {
    //    target.style.height = "0";
    //  } else {
    //    target.style.height = `${target.scrollHeight}px`;
    //  }
    // }
  };

  const onChangeEvent = (value: string) => {
    setMessage(value);

    // 改行のみ
    const result = `${value}\n`.match(/\n/g);
    if (result == null) return;
    setRows(result.length);

    // 折り返しに対応
    if (process.browser) {
      const target = document.getElementById("input_your_message") as HTMLInputElement;
      if (target == null) return;

      target.style.height = "auto";
      if (value === "") {
        target.style.height = "0";
      } else {
        target.style.height = `${target.scrollHeight}px`;
      }

      props.textarea_change_event();
    }
  };

  // test Data
  const customEmojiData: CustomEmoji[] = [];

  return (
    <>
      <div className={style.outer}>
        <div className={style.messageBox}>
          {/*
            {false ? <UploadButton onChange={checkfile} /> : <></>}
          */}
          <div className={style.textarea}>
            <TextareaBox
              disabled={disabled}
              rows={rows}
              onChange={onChangeEvent}
              placeholder={placeholder}
              value={message}
              onKeyDown={sendMessage}
            />
          </div>
          <SendButton onClick={sendMessage} />
          <EmojiPicker onSelect={selectEmoji} color="#FFC266" custom={customEmojiData} />
        </div>
      </div>
      {/*
      スタイルが上手く当たらないので見送ります.
      <div className={style.modal} hidden={!isShow}>
        <ModalWindow
          title="このファイルを送信しますか？"
          description={`${filename}`}
          preview_image_url={fileurl}
          continue_message="アップロード"
          cancel_message="キャンセル"
          continue_function={() => {setIsSending(true)}}
          cancel_function={() => {
            setIsSending(false)
            setIsShow(false)
          }}
        />
      </div>
      */}
    </>
  );
};

export default InputMessageBox;

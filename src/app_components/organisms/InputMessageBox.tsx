import { FC, useState, ChangeEvent, useEffect, useContext } from "react";
import { CustomEmoji, BaseEmoji } from "emoji-mart";
import { useRouter } from "next/router";

import EmojiPicker from "../molecules/EmojiPicker";
import SendButton from "../atoms/SendButton";
import TextareaBox from "../atoms/TextareaBox";
// import UploadButton from "../atoms/UploadButton";

import client from "../../lib/client";
import { PostMessageRes } from "../../types/message";
import { userContext } from "../../stores/user";

import style from "../../styles/app_components/organisms/InputMessageBox.module.scss";

type Props = {
  textareaChangeEvent: () => void;
  inputDisable: boolean;
};

const InputMessageBox: FC<Props> = (props) => {
  // API待ち
  const [rows, setRows] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  const { userState } = useContext(userContext);
  const router = useRouter();
  const { guildID, channelID } = router.query;

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
  const [isSending, setIsSending] = useState<boolean>(false);
  const [eventtarget] = useState<ChangeEvent<HTMLInputElement>>();
  const [, setIsShow] = useState<boolean>(false);
  /*
  const [filename, setFileName] = useState<string>("");
  const [fileurl, setFileUrl] = useState<string>("");

  const checkfile = (e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    const {files} = target;
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
 */

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

    setIsShow(false);
    setIsSending(false);
  }, [eventtarget, isSending]);

  // 絵文字の入力
  const selectEmoji = (e: BaseEmoji) => {
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
  // チャンネル名の取得
  const getChannelName = (): string => {
    if (channelID === undefined) return "";
    return userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels[
      userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].channels.findIndex(
        (item) => item.id === channelID,
      )
    ].name;
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
      if (target === null) return;

      target.style.height = "auto";
      if (value === "") {
        target.style.height = "0";
      } else {
        target.style.height = `${target.scrollHeight}px`;
      }

      props.textareaChangeEvent();
    }
  };

  // test Data
  const customEmojiData: CustomEmoji[] = [];

  if (channelID === undefined || guildID === undefined) return <></>;

  return (
    <>
      <div className={style.outer}>
        <div className={style.messageBox}>
          {/*
            {false ? <UploadButton onChange={checkfile} /> : <></>}
          */}
          <div className={style.textarea}>
            <TextareaBox
              disabled={props.inputDisable}
              rows={rows}
              onChange={onChangeEvent}
              placeholder={getChannelName()}
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

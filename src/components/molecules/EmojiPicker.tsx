import { FC, useEffect, useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { CustomEmoji, EmojiData, Picker, Emoji } from "emoji-mart";
import style from "../../styles/components/molecules/EmojiPicker.module.scss";

type EmojiProps = {
  custom: CustomEmoji[];
  color: string;
  onSelect: (emoji: EmojiData) => void;
};

const EmojiPicker: FC<EmojiProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    isShow && popupRef.current.focus();
  }, [isShow]);

  return (
    <div
      className={style.emojipopup}
      onClick={() => {
        if (!isShow) setIsShow(true);
      }}
      ref={popupRef}
      onBlur={() => setIsShow(false)}
      tabIndex={1000}
    >
      <div
        onClick={() => {
          if (!isShow) setIsShow(true);
        }}
        hidden={!isShow}
      >
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          autoFocus={true}
          emojiSize={33}
          theme="dark"
          set="twitter"
          useButton={false}
          custom={props.custom}
          color={props.color}
          onSelect={(emoji) => props.onSelect(emoji)}
        />
      </div>
      <Emoji emoji={"grinning"} size={30} />
    </div>
  );
};

export default EmojiPicker;

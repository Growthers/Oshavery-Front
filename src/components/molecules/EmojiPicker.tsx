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
  const emojipopup_classname = "emojipopup_element";
  const emoji_open_classname = "emojiopen_element";

  useEffect(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(style.emojipopup);
      const open_elements: HTMLCollectionOf<Element> = document.getElementsByClassName(emoji_open_classname);

      for (let i = 0; i < elements.length; i++) {
        set_class(elements[i], emojipopup_classname);
      };

      for (let j = 0; j < open_elements.length; j++) {
        set_class(open_elements[j], emojipopup_classname);
      };
    };
  }, []);

  // すべての子孫要素に指定クラスを設定
  function set_class(target: Element, class_name: string) {
    if (process.browser) {
      const count = target.childElementCount;

      for (let i = 0; i < count; i++) {
        target.children[i].classList.add(class_name);
        set_class(target.children[i], class_name);
      };
    };
  };

  // クリックイベント
  const check_click = (e: any) => {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    const class_name = String(target.className);
    const parent_class_name = String(parent.className);
    const grandparent_class_name = String(grandparent.className);

    if (!isShow) {
      return;
    };

    if (class_name.indexOf(emojipopup_classname) !== -1) {
      return;
    } else if (parent_class_name.indexOf(emojipopup_classname) !== -1) {
      return;
    } else if (grandparent_class_name.indexOf(emojipopup_classname) !== -1) {
      return;
    };

    setIsShow(false);
  };

  if (process.browser) {
    document.body.onclick = check_click;
  }

  return (
    <div
      ref={popupRef}
      tabIndex={1000}
    >
      <div
        onClick={() => {
          if (!isShow) setIsShow(true);
        }}
        hidden={!isShow}
        className={style.emojipopup}
      >
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          autoFocus={true}
          emojiSize={33}
          theme="dark"
          set="twitter"
          custom={props.custom}
          color={props.color}
          onSelect={(emoji) => props.onSelect(emoji)}
        />
      </div>
      <div
        onClick={() => {
          if (isShow) setIsShow(false);
          else if (!isShow) setIsShow(true);
        }}
        className={emoji_open_classname}
      >
        <Emoji
          emoji={"grinning"}
          size={30}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;

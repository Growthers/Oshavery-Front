import { useEffect, useRef, useState } from "react";
import type { FC, MouseEvent } from "react";
import "emoji-mart/css/emoji-mart.css";
import { CustomEmoji, EmojiData, Picker, Emoji, BaseEmoji } from "emoji-mart";

import style from "../../styles/app_components/molecules/EmojiPicker.module.scss";

type EmojiProps = {
  custom: CustomEmoji[];
  color: string;
  onSelect: (emoji: BaseEmoji) => void;
};

const EmojiPicker: FC<EmojiProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const popupRef = useRef(null);
  const emojipopupClassname = "emojipopup_element";
  const emojiOpenClassname = "emojiopen_element";
  const emojiAncherElement = "emoji-mart-anchor";

  // すべての子孫要素に指定クラスを設定
  function setClass(target: Element, class_name: string) {
    if (process.browser) {
      const count = target.childElementCount;

      for (let i = 0; i < count; i += 1) {
        target.children[i].classList.add(class_name);
        setClass(target.children[i], class_name);
      }
    }
  }
  // フォーカスと内容変更
  useEffect(() => {
    if (process.browser) {
      const parentTarget = document.getElementsByClassName("emoji-mart-search")[0];
      const count = parentTarget.childElementCount;
      let inputElementId = "";

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < count; i++) {
        const idName = parentTarget.children[i].id;
        const result = idName.match(/^emoji-mart-search-[0-9]{1,}$/g);
        if (result != null) {
          inputElementId = String(result);
          break;
        }
      }

      const target = document.getElementById(inputElementId) as HTMLInputElement;
      if (target == null) return;
      if (isShow) target.focus();
      else if (!isShow) target.value = "";
    }
  }, [isShow]);

  useEffect(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(style.emojipopup);
      const openElements: HTMLCollectionOf<Element> = document.getElementsByClassName(emojiOpenClassname);

      for (let i = 0; i < elements.length; i += 1) {
        setClass(elements[i], emojipopupClassname);
      }

      for (let j = 0; j < openElements.length; j += 1) {
        setClass(openElements[j], emojipopupClassname);
      }
    }
  });

  // クリックイベント
  const checkClick = (e: MouseEvent<HTMLInputElement>) => {
    try {
      const { target } = e;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const parent = target.parentNode;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const grandparent = parent.parentNode;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const nowClassName = String(target.className);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const parentClassName = String(parent.className);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const grandparentClassName = String(grandparent.className);

      if (!isShow) {
        return;
      }

      if (nowClassName.indexOf(emojipopupClassname) !== -1) {
        return;
      }
      if (parentClassName.indexOf(emojipopupClassname) !== -1) {
        return;
      }
      if (!grandparentClassName) {
        return;
      }
      if (grandparentClassName.indexOf(emojipopupClassname) !== -1) {
        return;
      }
    } catch (err) {
      return;
    }

    setIsShow(false);
  };
  const checkIsShow = () => {
    if (isShow) setIsShow(false);
    else if (!isShow) setIsShow(true);
  };

  if (process.browser) {
    document.body.onclick = checkClick;
  }

  // emoji-mart ancherの Click event
  const checkEmojiClick = (e: MouseEvent<HTMLInputElement>, check_target: string) => {
    try {
      const emojiInputElement = "emoji-mart-search";
      const { target } = e;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parent = target.parentNode;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const grandparent = parent.parentNode;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const greatgrandparent = parent.parentNode;

      const className = String(target.className);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const parentClassName = String(parent.className);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const grandparentClassName = String(grandparent.className);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const greatgrandparentClassName = String(greatgrandparent.className);

      if (!isShow || !grandparentClassName) {
        return;
      }

      if (className.indexOf(check_target) !== -1 || className.indexOf(emojiInputElement) !== -1) {
        setIsShow(true);
      } else if (parentClassName.indexOf(check_target) !== -1 || parentClassName.indexOf(emojiInputElement) !== -1) {
        setIsShow(true);
      } else if (
        grandparentClassName.indexOf(check_target) !== -1 ||
        grandparentClassName.indexOf(emojiInputElement) !== -1
      ) {
        setIsShow(true);
      } else if (!greatgrandparentClassName) {
        setIsShow(true);
      } else if (
        greatgrandparentClassName.indexOf(check_target) !== -1 ||
        greatgrandparentClassName.indexOf(emojiInputElement) !== -1
      ) {
        setIsShow(true);
      } else setIsShow(false);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  return (
    <div className={style.emojipicker} ref={popupRef}>
      <div
        hidden={!isShow}
        className={style.emojipopup}
        aria-hidden
        onClick={(e: MouseEvent<HTMLInputElement>) => checkEmojiClick(e, emojiAncherElement)}
      >
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          autoFocus
          skin={1}
          emojiSize={33}
          theme="dark"
          set="twitter"
          custom={props.custom}
          color={props.color}
          onSelect={(emoji: EmojiData) => props.onSelect(emoji)}
        />
      </div>
      <div onClick={checkIsShow} aria-hidden className={`${emojiOpenClassname} ${style.emoji}`}>
        <Emoji emoji="grinning" size={30} set="twitter" />
      </div>
    </div>
  );
};

export default EmojiPicker;

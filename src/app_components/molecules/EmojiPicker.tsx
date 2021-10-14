import { ErrorInfo, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import "emoji-mart/css/emoji-mart.css";
import { CustomEmoji, EmojiData, Picker, Emoji } from "emoji-mart";

import style from "../../styles/app_components/molecules/EmojiPicker.module.scss";

type EmojiProps = {
  custom: CustomEmoji[];
  color: string;
  onSelect: (emoji: EmojiData) => void;
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
  const checkClick = (e: any) => {
    try {
      const { target } = e;
      const parent = target.parentNode;
      const grandparent = parent.parentNode;

      const class_name = String(target.className);
      const parent_class_name = String(parent.className);
      const grandparent_class_name = String(grandparent.className);

      if (!isShow) {
        return;
      }

      if (class_name.indexOf(emojipopupClassname) !== -1) {
        return;
      }
      if (parent_class_name.indexOf(emojipopupClassname) !== -1) {
        return;
      }
      if (!grandparent_class_name) {
        return;
      }
      if (grandparent_class_name.indexOf(emojipopupClassname) !== -1) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    setIsShow(false);
  };

  if (process.browser) {
    document.body.onclick = checkClick;
  }

  // emoji-mart ancherの Click event
  const checkEmojiClick = (e:any, check_target: string) => {
    try {
      const emojiInputElement = "emoji-mart-search";
      const { target } = e;
      const parent = target.parentNode;
      const grandparent = parent.parentNode;
      const greatgrandparent = parent.parentNode;

      const className = String(target.className);
      const parentClassName = String(parent.className);
      const grandparentClassName = String(grandparent.className);
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
    } catch (e) {}
  };

  return (
    <div className={style.emojipicker} ref={popupRef} tabIndex={1000}>
      <div
        hidden={!isShow}
        className={style.emojipopup}
        onClick={(e) => {
          checkEmojiClick(e, emojiAncherElement);
        }}
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
      <div
        onClick={() => {
          if (isShow) setIsShow(false);
          else if (!isShow) setIsShow(true);
        }}
        className={`${emojiOpenClassname} ${style.emoji}`}
      >
        <Emoji emoji="grinning" size={30} set="twitter" />
      </div>
    </div>
  );
};

export default EmojiPicker;

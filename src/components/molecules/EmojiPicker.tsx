import { FC } from "react";
import "emoji-mart/css/emoji-mart.css";
import { CustomEmoji, EmojiData, Picker } from "emoji-mart";

type EmojiProps = {
  custom: CustomEmoji[];
  color: string;
  onSelect: (emoji: EmojiData) => void;
};

const EmojiPicker: FC<EmojiProps> = (props) => {
  return (
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
  );
};

export default EmojiPicker;

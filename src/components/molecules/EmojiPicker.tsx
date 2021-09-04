import { FC } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
type customEmoji = {
  name: string;
  short_name: string[];
  text?: string;
  emoticons: [];
  keywords?: string[];
};
type emojiProps = {
  set: string;
  autoFocus: number;
  color: string;
  custom?: customEmoji[];
};

const EmojiPicker: FC = () => {
  return (
    <div>
      <Picker
        set="twitter"
        onSelect={(emoji) => console.table(emoji)}
        title="Pick your emoji…"
        emoji="point_up"
        color="#FFC266"
        autoFocus={true}
        emojiSize={33}
        theme="auto"
      />
    </div>
  );
};

export default EmojiPicker;

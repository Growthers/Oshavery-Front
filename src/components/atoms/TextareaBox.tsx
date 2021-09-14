import { FC } from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";

type TextareaProps = {
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  rows: number;
  value: string;
  //今後追加
  onKeyDown: () => void;
};

type defaultTextareaSettingsType = {
  minLength: number; // default 1
  maxLength: number; //default 10,000
  autoComplete: "off" | "on";
  spellCheck: boolean;
  wrap: "soft"; //default
};

const defaultTextareaSettings: defaultTextareaSettingsType = {
  minLength: 1,
  maxLength: 10000,
  autoComplete: "off",
  spellCheck: false,
  wrap: "soft",
};

const TextareaBox: FC<TextareaProps> = (props) => {
  return (
    <textarea
      id="input_your_message"
      {...defaultTextareaSettings}
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          props.onKeyDown();
          e.preventDefault();
        }
      }}
      className={style.TextareaBox}
    />
  );
};

export default TextareaBox;

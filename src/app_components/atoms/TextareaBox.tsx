import { FC } from "react";
import style from "../../styles/app_components/atoms/TextareaBox.module.scss";

type TextareaProps = {
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  rows: number;
  value: string;
  // 今後追加
  onKeyDown: () => void;
};

type DefaultTextareaSettingsType = {
  minLength: number; // default 1
  maxLength: number; // default 10,000
  autoComplete: "off" | "on";
  spellCheck: boolean;
  wrap: "soft"; // default
};

const defaultTextareaSettings: DefaultTextareaSettingsType = {
  minLength: 1,
  maxLength: 10000,
  autoComplete: "off",
  spellCheck: false,
  wrap: "soft",
};

const TextareaBox: FC<TextareaProps> = (props) => (
  <textarea
    id="input_your_message"
    {...defaultTextareaSettings}
    disabled={props.disabled}
    rows={props.rows}
    value={props.value}
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

export default TextareaBox;

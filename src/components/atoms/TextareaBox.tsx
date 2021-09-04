import { FC } from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";

type TextareaProps = {
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  cols: number;
  rows: number;
  value: string;
  //今後追加
  onkeypress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
      {...defaultTextareaSettings}
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      className={style.TextareaBox}
    />
  );
};

export default TextareaBox;

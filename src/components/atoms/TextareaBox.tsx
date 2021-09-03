import { forwardRef } from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";

type Props = {
  onChange: (event: string) => void;
  placeholder: string;
  disabled: boolean;
  cols: number;
  rows: number;
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

type Ref = HTMLTextAreaElement;
const TextareaBox = forwardRef<Ref, Props>(function InputTextarea(props, ref) {
  return (
    <textarea
      {...defaultTextareaSettings}
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      ref={ref}
      className={style.TextareaBox}
    />
  );
});

export default TextareaBox;

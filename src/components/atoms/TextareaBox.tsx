import { FC, useRef } from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";
import { channeData } from "../molecules/MessageBox";

type Props = Pick<channeData, "channel_name"> & {
  //onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  //any型になってしまっているので要修正
  onChange: (event: string) => void;
  //今後追加
  onkeypress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
  cols: number;
  rows: number;
};

type defaultTextareaSettingsType = {
  minlength: number; // default 1
  maxlength: number; //default 10,000
  autocomplete: "off" | "on";
  spellcheck: boolean;
  wrap: "soft"; //default
};

const defaultTextareaSettings: defaultTextareaSettingsType = {
  minlength: 1,
  maxlength: 10000,
  autocomplete: "off",
  spellcheck: false,
  wrap: "soft",
};

const TextareaBox: FC<Props> = (props) => {
  const textareaElement = useRef(null);

  return (
    <textarea
      placeholder={props.channel_name}
      disabled={props.disabled}
      cols={props.cols}
      rows={props.rows}
      minLength={defaultTextareaSettings.minlength}
      maxLength={defaultTextareaSettings.maxlength}
      autoComplete={defaultTextareaSettings.autocomplete}
      spellCheck={defaultTextareaSettings.spellcheck}
      wrap={defaultTextareaSettings.wrap}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      ref={textareaElement}
      className={style.TextareaBox}
    ></textarea>
  );
};
export default TextareaBox;

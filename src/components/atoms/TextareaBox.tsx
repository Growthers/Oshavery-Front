import { forwardRef } from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";

type Props = {
  onChange: (event: string) => void;
  placeholder: string;
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

type Ref = HTMLTextAreaElement;
//any型のため要修正
const TextareaBox = forwardRef<Ref, Props>(function InputTextarea(
  props,
  ref
): any {
  <textarea
    minLength={defaultTextareaSettings.minlength}
    maxLength={defaultTextareaSettings.maxlength}
    autoComplete={defaultTextareaSettings.autocomplete}
    spellCheck={defaultTextareaSettings.spellcheck}
    wrap={defaultTextareaSettings.wrap}
    placeholder={props.placeholder}
    disabled={props.disabled}
    cols={props.cols}
    rows={props.rows}
    className={style.TextareaBox}
    onChange={(e) => {
      props.onChange(e.target.value);
    }}
    ref={ref}
  />;
});

export default TextareaBox;

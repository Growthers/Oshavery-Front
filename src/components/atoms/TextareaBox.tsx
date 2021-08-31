import {
  FC,
  ForwardRefExoticComponent,
  PropsWithRef,
} from "react";
import style from "../../styles/components/atoms/TextareaBox.module.scss";

export type ElementFrec<T extends keyof JSX.IntrinsicElements> =
  ForwardRefExoticComponent<PropsWithRef<JSX.IntrinsicElements[T]>>;

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

const TextareaBox: FC<Props> = (props) => {
  return (
    <textarea
      placeholder={props.placeholder}
      disabled={props.disabled}
      cols={props.cols}
      rows={props.rows}
      minLength={defaultTextareaSettings.minlength}
      maxLength={defaultTextareaSettings.maxlength}
      autoComplete={defaultTextareaSettings.autocomplete}
      spellCheck={defaultTextareaSettings.spellcheck}
      wrap={defaultTextareaSettings.wrap}
      className={style.TextareaBox}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    ></textarea>
  );
};
export default TextareaBox;

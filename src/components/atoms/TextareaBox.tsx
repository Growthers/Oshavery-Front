import type { FC } from "react";
import style from "../../styles/components/atoms/inputMessageBox.module.scss";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoFocus: boolean;
  disabled: boolean;
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

const TextareaBox: FC<Props> = (props, defaultTextareaSettings) => {
  return (
    <textarea
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      disabled={props.disabled}

    ></textarea>
  );
};
export default TextareaBox;

/*
textarea attribute
autocapitalize = none // iOS only
autocomplete = off
autofocus = autofocus

cols // default 20
rows











 */

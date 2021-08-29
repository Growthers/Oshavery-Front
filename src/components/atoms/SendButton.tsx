import type { FC } from "react";
import style from "../../styles/components/atoms/sendButton.module.scss";

type Props = {
  onClick : VoidFunction;
}

const SendButton: FC<Props> = (props) => {
  return (
    <button className={style.messageSendButton} onClick={props.onClick}>
      <svg>
        <path d="M0.000195503 0L75 28L6.58803 27.5L0.000195503 0Z" />
        <path d="M0.000183105 56.5L75 28L6.58802 29L0.000183105 56.5Z" />
      </svg>
    </button>
  );
};

export default SendButton;

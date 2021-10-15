import type { FC } from "react";
import style from "../../styles/app_components/atoms/SendButton.module.scss";

type Props = {
  onClick: VoidFunction;
};

const SendButton: FC<Props> = (props) => (
  <div className={style.messageSendButton}>
    <svg
      version="1.1"
      onClick={props.onClick}
      width="35"
      height="26"
      viewBox="0 0 75 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.000195503 0L75 28L6.58803 27.5L0.000195503 0Z" />
      <path d="M0.000183105 56.5L75 28L6.58802 29L0.000183105 56.5Z" />
    </svg>
  </div>
);

export default SendButton;

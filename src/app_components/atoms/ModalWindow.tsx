import React from "react";
import { FC } from "react";

import style from "../../styles/app_components/atoms/ModalWindow.module.scss";

type Props = {
  title: string;
  description: string;
  preview_image_url: string;
  continue_message: string;
  cancel_message: string;
  continue_function: () => void;
  cancel_function: () => void;
};

const ModalWindow: FC<Props> = (props) => {
  return (
    <div className={style.modalwindow}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <img src={props.preview_image_url} className={style.image} />
      <div>
        <button type="button" onClick={props.cancel_function}>
          {props.cancel_message}
        </button>
        <button type="button" onClick={props.continue_function}>
          {props.continue_message}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ModalWindow);

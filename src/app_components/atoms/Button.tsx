import type { FC, ReactNode } from "react";
import styles from "../../styles/app_components/atoms/Button.module.scss";

type Props = {
  children: ReactNode;
  onClick: VoidFunction;
};

const Button: FC<Props> = (props) => (
  <div className={styles.Button} onClick={props.onClick} onKeyDown={props.onClick} role="button" tabIndex={0}>
    {props.children}
  </div>
);

export default Button;

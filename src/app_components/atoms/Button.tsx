import type { FC, MouseEvent, ReactNode } from "react";
import styles from "../../styles/app_components/atoms/Button.module.scss";

type Props = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

const Button: FC<Props> = ({ children, onClick }) => (
  <div onClick={onClick} className={styles.Button}>
    {children}
  </div>
);

export default Button;

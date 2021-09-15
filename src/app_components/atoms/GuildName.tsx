import { FC, ReactNode } from "react";
import styles from "../../styles/app_components/atoms/GuildName.module.scss";
type Props = {
  children: ReactNode;
};

const GuildName: FC<Props> = (props) => {
  return <div className={styles.guildName}>{props.children}</div>;
};

import React from "react";
import type { FC } from "react";
import styles from "../../styles/app_components/atoms/NameCard.module.scss";

type Props = {
  name: string;
};

const NameCard: FC<Props> = (props) => (
  <div className={styles.nameCard}>
    <span className={styles.guildName}>{props.name}</span>
  </div>
);

export default React.memo(NameCard);

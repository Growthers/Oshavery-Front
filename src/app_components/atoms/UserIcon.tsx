import { FC } from "react";
import style from "../../styles/app_components/atoms/UserIcon.module.scss";

type iconProps = {
  imgUrl: string;
  size: number;
};

const UserIcon: FC<iconProps> = (props) => (
  <img src={props.imgUrl} width={props.size} height={props.size} className={style.icon} />
);

export default UserIcon;

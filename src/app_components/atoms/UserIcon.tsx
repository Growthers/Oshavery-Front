import { FC } from "react";
import style from "../../styles/app_components/atoms/UserIcon.module.scss";
type iconProps = {
  imgUrl: string;
  size: number;
};

const UserIcon: FC<iconProps> = (props) => {
  return <img src={props.imgUrl} width={props.size} height={props.size} className={style.icon}></img>;
};

export default UserIcon;

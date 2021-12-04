import { FC } from "react";
import Image from "next/image";
import style from "../../styles/app_components/atoms/UserIcon.module.scss";

type IconProps = {
  imgUrl: string;
  size: number;
};

const UserIcon: FC<IconProps> = (props) => (
  <Image src={props.imgUrl} width={props.size} height={props.size} className={style.icon} />
);

export default UserIcon;

import { FC, createRef, useState } from "react";
import style from "../../styles/app_components/atoms/UserIcon.module.scss";
type iconProps = {
  iconFile: File;
};

const UserIcon: FC<iconProps> = (props) => {
  const imgRef = createRef<HTMLImageElement>();
  const [imgUrl, setImgUrl] = useState("");

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      imgRef;
    };
  };

  return <img src={this} className={style.icon} ref={imgRef}></img>;
};

export default UserIcon;

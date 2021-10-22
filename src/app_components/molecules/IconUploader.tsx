import { FC, useState } from "react";
// ↑ please add ChangeEvent
import UserIcon from "../atoms/UserIcon";

type Props = {
  // setIcon: (file: File) => void;
  // 初回ログイン時のみ設定
  defaultIcon?: string;
};

const IconUploader: FC<Props> = ({ defaultIcon }) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  // set default icon
  if (defaultIcon) setImgUrl(defaultIcon);

  /* backend待ち
  //handle input File
  const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file === null) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    props.setIcon(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      setImgUrl(result);
    };
  };

 */
  return (
    <div>
      <UserIcon size={40} imgUrl={imgUrl} />
      {/**
         false ? <input type="file" accept={"image/png, image/jpeg"} onChange={imageHandler} /> : <></>
      * */}
    </div>
  );
};

IconUploader.defaultProps = {
  defaultIcon: "",
};

export default IconUploader;

import { ChangeEvent, FC, useState } from "react";
import UserIcon from "../atoms/UserIcon";

type Props = {
  setIcon: (file: File) => void;
};
const IconUploader: FC<Props> = (props) => {
  const [imgUrl, setImgUrl] = useState<string>("");

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

  return (
    <div>
      <UserIcon size={40} imgUrl={imgUrl} />
      <input type="file" accept={"image/png, image/jpeg"} onChange={imageHandler} />
    </div>
  );
};

export default IconUploader;

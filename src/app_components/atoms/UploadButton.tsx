import { ChangeEvent, FC, useRef } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import style from "../../styles/app_components/atoms/UploadButton.module.scss";

type uploadProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const UploadButton: FC<uploadProps> = (props) => {
  const inputRef = useRef(null);
  return (
    <label className={style.upload}>
      <AiOutlineUpload size={26} />
      <input hidden id="uploadButton" ref={inputRef} type="file" onChange={props.onChange} />
    </label>
  );
};

export default UploadButton;

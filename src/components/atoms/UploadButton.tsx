import { ChangeEvent, FC, useRef } from "react";
import style from "../../styles/components/atoms/UploadButton.module.css";
import { AiOutlineUpload } from "react-icons/ai";
type uploadProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const UploadButton: FC<uploadProps> = (props) => {
  const inputRef = useRef(null);
  return (
    <label className={style.upload}>
      <AiOutlineUpload size={26} />
      <input
        hidden
        id="uploadButton"
        ref={inputRef}
        type="file"
        onChange={props.onChange}
      />
    </label>
  );
};

export default UploadButton;

import { FC, useState, memo } from "react";
import InputBox from "../atoms/InputBox";
import style from "../../styles/app_components/organisms/Settings.module.scss";
import Modal from "react-modal";
import UploadButton from "../atoms/UploadButton";

Modal.setAppElement("#__next");

const modalStyle = {
  content: {
    position: "abusolute",
    backgroundColor: "#ffc266",
  },
};
const Settings: FC = () => {
  const [isOpen, setIsopen] = useState(true);
  const [userName, setUserName] = useState("");
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={() => setIsopen(false)}>
        <div className={style.nameAndIcon}>
          <div className={style.userName}>
            <p>ユーザネーム</p>
            <InputBox value={userName} onChange={setUserName} />
          </div>

        </div>
        <button onClick={() => setIsopen(false)}>保存</button>
      </Modal>
    </div>
  );
};
export default memo(Settings);

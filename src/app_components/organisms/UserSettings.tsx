import { FC, useState, memo } from "react";
import InputBox from "../atoms/InputBox";
import style from "../../styles/app_components/organisms/Settings.module.scss";
import Modal from "react-modal";
import IconUploader from "../molecules/IconUploader";

Modal.setAppElement("#__next");

const Settings: FC = () => {
  const [isOpen, setIsopen] = useState(true);
  const [userName, setUserName] = useState("");
  //  const [icon, setIcon] = useState<File>();
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsopen(false)}
        className={`${style.Modal} ${style.Overlay}`}>
        <div className={style.nameAndIcon}>
          <div className={style.uploadIcon}>
            <IconUploader />
          </div>
          <div className={style.userName}>
            <p>ユーザネーム</p>
            <InputBox value={userName} onChange={setUserName} />
          </div>
        </div>

        {/* <div className={style.setSNS}>
          <p>Twitter</p>
          </div>*/}
        <button onClick={() => setIsopen(false)}>保存</button>
      </Modal>
    </div>
  );
};
export default memo(Settings);
// iconがnullの時、

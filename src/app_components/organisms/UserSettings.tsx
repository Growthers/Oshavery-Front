import { FC, useState, memo } from "react";
import InputBox from "../atoms/InputBox";
import style from "../../styles/app_components/organisms/UserSettings.module.scss";
import Modal from "react-modal";
import IconUploader from "../molecules/IconUploader";

Modal.setAppElement("#__next");

type settingsProps = {
  onClick: (isShow: boolean) => void;
  isShow: boolean;
};

const Settings: FC<settingsProps> = (props) => {
  const [userName, setUserName] = useState("");
  //  const [icon, setIcon] = useState<File>();
  return (
    <>
      <Modal
        isOpen={props.isShow}
        onRequestClose={() => props.onClick(false)}
        className={`${style.Overlay}`}
      >
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
        <button onClick={() => props.onClick(false)}>保存</button>
      </Modal>
    </>
  );
};
export default memo(Settings);
// iconがnullの時、

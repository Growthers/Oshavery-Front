import { FC, useState, memo } from "react";
import Modal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";

// import InputBox from "../atoms/InputBox";
// import IconUploader from "../molecules/IconUploader";

import style from "../../styles/app_components/organisms/UserSettings.module.scss";

Modal.setAppElement("#__next");

type SettingsProps = {
  onClick: (isShow: boolean) => void;
  isShow: boolean;
};

const Settings: FC<SettingsProps> = (props) => {
  const { logout, user } = useAuth0();
  //  const [userName, setUserName] = useState(user?.name);
  //  const [icon, setIcon] = useState<File>();

  return (
    <>
      <Modal isOpen={props.isShow} onRequestClose={() => props.onClick(false)} className={`${style.Overlay}`}>
        {/* <div className={style.nameAndIcon}>
          <div className={style.uploadIcon}>
            <IconUploader />
          </div>
          <div className={style.userName}>
            <p>ユーザネーム</p>
            <InputBox value={userName} onChange={setUserName} />
          </div>
        </div> */}

        {/* <div className={style.setSNS}>
          <p>Twitter</p>
          </div> */}
        {/* <button onClick={() => props.onClick(false)}>保存</button> */}

        <div className={style.logout}>
          <span>ログアウトする</span>
          <div className={style.logout_buttons}>
            <button type="button" onClick={() => logout()} className={style.logout_button}>
              Logout
            </button>
            <button type="button" onClick={() => props.onClick(!props.isShow)} className={style.logout_button}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default memo(Settings);
// iconがnullの時、

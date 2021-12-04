import { FC, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineSetting } from "react-icons/ai";
import style from "../../styles/app_components/organisms/UserStatus.module.scss";
// [WIP]
// UserStatusという名前だがStatus機能は存在しません
type Props = {
  onClick: (change: boolean) => void;
  modalIsShow: boolean;
};

const UserStatus: FC<Props> = (props) => {
  const { user } = useAuth0<{ name: string; picture: string }>();
  return (
    <div className={style.userstatus}>
      {user ? (
        <>
          <img src={user.picture} alt="icon" className={style.usericon} />
          <div className={style.username}>{user.name}</div>
        </>
      ) : (
        <span color="red">error</span>
      )}
      <div className={style.settingbutton}>
        <AiOutlineSetting
          size={38}
          onClick={() => {
            props.onClick(!props.modalIsShow);
            console.log(!props.modalIsShow);
          }}
        />
      </div>
    </div>
  );
};

export default memo(UserStatus);

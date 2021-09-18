import { FC, memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineSetting } from "react-icons/ai";
import style from "../../styles/app_components/organisms/UserStatus.module.scss";
//[WIP]
//UserStatusという名前だがStatus機能は存在しません
type Props = {
  onClick: (change: boolean) => void;
  modalIsShow: boolean;
};

const UserStatus: FC<Props> = (props) => {
  const { user } = useAuth0<{ name: string; picture: string }>();
  return (
    <div className={style.userStatus}>
      {user ? (
        <>
          <img src={user.picture} alt="icon" className={style.userIcon} />
          <div className={style.userName}>{user.name}</div>
        </>
      ) : (
        <span color="red">error</span>
      )}
      <div className={style.settingButton}>
        <AiOutlineSetting size={38} onClick={() => props.onClick(!props.modalIsShow)} />
      </div>
    </div>
  );
};

export default memo(UserStatus);

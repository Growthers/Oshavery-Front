import React, { useContext, useEffect } from "react";
import type { FC } from "react";
import { useState, useCallback } from "react";

import MemberCard from "../atoms/MemberCard";

import member_style from "../../styles/app_components/atoms/MemberCard.module.scss";
import { useRouter } from "next/router";
import { user } from "../../types/user";
import { userContext } from "../../stores/user";

import style from "../../styles/app_components/organisms/MemberList.module.scss";

const MemberList: FC = () => {
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();
  const { guildID } = router.query;
  const [members, setMembers] = useState<user[]>();
  const { userState } = useContext(userContext);

  // メンバーポップアップのクリア
  const clear_memberpopup = useCallback(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(member_style.memberpopup);

      for (let i = 0; i < elements.length; i++) {
        elements[i].className = member_style.memberpopup;
      }

      setIsShow(false);
    }
  }, []);

  // 引数のIDのクラスを変更（メンバーポップアップ表示）
  const show_memberpopup = useCallback(
    (target_id: string) => {
      if (process.browser) {
        const target: HTMLElement | null = document.getElementById(target_id);

        if (target == null) {
          return;
        }

        if (target.className.indexOf(member_style.show) !== -1) {
          clear_memberpopup();
          return;
        } else {
          clear_memberpopup();
        }

        target.className = `${member_style.memberpopup} ${member_style.show}`;
        setIsShow(true);
      }
    },
    [clear_memberpopup],
  );

  // クリックイベント
  const check_click = (e: any) => {
    const class_name = String(e.target.className);

    if (class_name.indexOf("member_element") !== -1) {
      return;
    }

    if (class_name.indexOf("memberpopup_element") !== -1) {
      return;
    }

    if (!isShow) {
      return;
    }

    clear_memberpopup();
  };

  if (process.browser) {
    document.body.onclick = check_click;
  }

  useEffect(() => {
    if (guildID != undefined) {
      setMembers(userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)].users);
    }
  }, [userState, guildID]);

  /*
  UserId代用のHTML要素ID
  let element_id_array: string[] = [];

  for (let i = 0; i < members_data.length; i++) {
    let set_id = "";
    while (true) {
      set_id = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      if (!element_id_array.includes(set_id)) {
        element_id_array.push(set_id);
        break;
      };
    };
  };
  */

  if (members == undefined) return <></>;

  return (
    <div className={style.memberlist}>
      {members.map((value) => (
        <MemberCard
          key={value.id}
          id={value.id}
          // element_id={element_id_array[index]}
          name={value.name}
          avatar={value.avatar}
          bot={value.bot}
          func_show_memberpopup={show_memberpopup}
        />
      ))}
    </div>
  );
};

export default React.memo(MemberList);

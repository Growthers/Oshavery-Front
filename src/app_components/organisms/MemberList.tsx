import React, { useContext, useEffect, useState, useCallback } from "react";
import type { FC } from "react";

import { useRouter } from "next/router";
import MemberCard from "../atoms/MemberCard";

import member_style from "../../styles/app_components/atoms/MemberCard.module.scss";
import { User } from "../../types/user";
import { userContext } from "../../stores/user";

import style from "../../styles/app_components/organisms/MemberList.module.scss";
import client from "../../lib/client";

const MemberList: FC = () => {
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();
  const { guildID } = router.query;
  const [members, setMembers] = useState<User[]>();
  const { userState, userDispatch } = useContext(userContext);

  // メンバーポップアップのクリア
  const clearMemmberPopp = useCallback(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(member_style.memberpopup);

      for (let i = 0; i < elements.length; i += 1) {
        elements[i].className = member_style.memberpopup;
      }

      setIsShow(false);
    }
  }, []);

  // 引数のIDのクラスを変更（メンバーポップアップ表示）
  const showMemberPopup = useCallback(
    (target_id: string) => {
      if (process.browser) {
        const target: HTMLElement | null = document.getElementById(target_id);

        if (target == null) {
          return;
        }

        if (target.className.indexOf(member_style.show) !== -1) {
          clearMemmberPopp();
          return;
        }
        clearMemmberPopp();

        target.className = `${member_style.memberpopup} ${member_style.show}`;
        setIsShow(true);
      }
    },
    [clearMemmberPopp],
  );

  // クリックイベント
  const CheckClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickedClassName = target.className;

    if (clickedClassName.indexOf("member_element") !== -1) {
      return null;
    }

    if (clickedClassName.indexOf("memberpopup_element") !== -1) {
      return null;
    }

    if (!isShow) {
      return null;
    }

    clearMemmberPopp();

    return null;
  };

  if (process.browser) {
    document.body.onclick = CheckClick;
  }

  useEffect(() => {
    if (guildID !== undefined && !Array.isArray(guildID)) {
      client
        .get<User[]>(`/guilds/${guildID}/members`)
        .then((res) => {
          userDispatch({
            type: "setMember",
            newData: res.data,
          });
          setMembers(res.data);
        })
        .catch(() => {});
    }
  }, [userDispatch, userState, guildID]);

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

  if (members === undefined) return <></>;

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
          func_show_memberpopup={showMemberPopup}
        />
      ))}
    </div>
  );
};

export default React.memo(MemberList);

import React from "react";
import type { FC } from "react";
import { useState, useCallback } from "react";

import MemberCard from "../atoms/MemberCard";

import member_style from "../../styles/components/atoms/MemberCard.module.scss";

export type MembersData = {
  id: string;
  name: string;
  avatar_url: string;
  bot: boolean;
};

const members_data: MembersData[] = [];

const MemberList: FC = () => {
  const [isShow, setIsShow] = useState(false);

  // メンバーポップアップのクリア
  const clear_memberpopup = useCallback(() => {
    if (process.browser) {
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName(member_style.memberpopup);

      for (let i = 0; i < elements.length; i++) {
        elements[i].className = member_style.memberpopup;
      }

      setIsShow(false);
    }
  }, []);

  // 引数のIDのクラスを変更（メンバーポップアップ表示）
  const show_memberpopup = useCallback((target_id: string) => {
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
  }, []);

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

  return (
    <div>
      {members_data.map((value, index) => {
        return (
          <MemberCard
            key={value.id}
            id={value.id}
            // element_id={element_id_array[index]}
            name={value.name}
            avatar_url={value.avatar_url}
            bot={value.bot}
            func_show_memberpopup={show_memberpopup}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MemberList);

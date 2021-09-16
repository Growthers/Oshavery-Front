import type { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import style from "../styles/components/Footer.module.scss";

const Footer: FC = () => {
  const { logout } = useAuth0();
  return (
    <footer className={style.footer}>
      <div className={style.lists}>
        <div className={style.group}>
          <p className={style.group_title}>Oshavery</p>
          <ul>
            <li className={style.group_list}>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <div onClick={() => logout()}>
                <span className={style.logout}>Logout</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={style.group}>
          <p className={style.group_title}>GitHub Repositories</p>
          <ul>
            <li className={style.group_list}>
              <a
                href="https://github.com/Undecided-Discord/Oshavery"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                Oshavery
              </a>
            </li>
            <li className={style.group_list}>
              <a
                href="https://github.com/Undecided-Discord/Oshavery-Front"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                Oshavery - FrontEnd
              </a>
            </li>
            <li className={style.group_list}>
              <a
                href="https://github.com/Undecided-Discord/Oshavery-Server"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                Oshavery - BackEnd
              </a>
            </li>
          </ul>
        </div>
        <div className={style.group}>
          <p className={style.group_title}>Creators</p>
          <ul>
            <li className={style.group_list}>
              <a
                href="https://undecided.page.link/site"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                共同開発鯖 - HP
              </a>
            </li>
            <li className={style.group_list}>
              <a
                href="https://github.com/Undecided-Discord"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                共同開発鯖 - GitHub Org
              </a>
            </li>
            <li className={style.group_list}>
              <a
                href="https://twitter.com/Undecided_disc"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
              >
                共同開発鯖 - Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <small className={style.copyright}>Copyright &copy; 2021 共同開発鯖</small>
      </div>
    </footer>
  );
};

export default Footer;

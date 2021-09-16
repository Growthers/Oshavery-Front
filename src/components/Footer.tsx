import type { FC } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import style from "../styles/components/Footer.module.scss";

const Footer: FC = () => {
  const { user } = useUser();

  return (
    <footer className={style.footer}>
      <div className={style.lists}>
        <div className={style.group}>
          <p className={style.group_title}>Oshavery</p>
          {user ? (
            /* eslint-disable-next-line @next/next/no-html-link-for-pages */
            <li className={style.group_list}>
              <a href="/api/auth/logout">
                <span className={style.logout}>Logout</span>
              </a>
            </li>
          ) : (<></>)}
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

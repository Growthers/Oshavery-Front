import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

import logo from "../../public/logo_long_dark.png";
import style from "../styles/components/Header.module.scss";

const Header: FC = () => {
  const { user } = useUser();

  return (
    <header className={style.header}>
      {/*logo*/}
      <Link href="/">
        <a className={style.logo}>
          <Image src={logo} alt="Oshavery logo" />
        </a>
      </Link>
      <div className={style.links}>
        <Link href="/">
          <a className={style.link}>Home</a>
        </Link>
        {/*
        <Link href="/about">
          <a className={style.link}>About</a>
        </Link>
        */}
      </div>
      <div className={style.login}>
        {user ? (
          <Link href="/loading">
            <a className={style.start_button}>Go to Oshavery</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className={style.start_button}>Login</a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

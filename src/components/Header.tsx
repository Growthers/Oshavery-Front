import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

const Header: FC = () => {
  const { user } = useUser();

  return (
    <header>
      {/*logo*/}
      <Link href="/">
        <a>
          <Image src="" alt="Oshavery logo" />
        </a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      {user ? (
        <Link href="/loading">
          <a>Go to Oshavery</a>
        </Link>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </header>
  );
};

export default Header;

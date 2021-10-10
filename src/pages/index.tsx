import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import style from "../styles/app_components/organisms/loginPage.module.scss";

const Home: NextPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className={style.page}>
      <div className={style.loginPage}>
        <div>Login Page</div>
        {isAuthenticated ? (
          <Link href="/loading">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={style.item}>Go to Oshavery</a>
          </Link>
        ) : (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <button type="button" role="button" onClick={() => loginWithRedirect()} className={style.item}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

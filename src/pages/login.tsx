import { useAuth0 } from "@auth0/auth0-react";
import type { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <>
      <h1>Login Page</h1>
      {isAuthenticated ? (
        <Link href="/loading">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>Go to Oshavery</a>
        </Link>
      ) : (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <button type="button" role="button" onClick={() => loginWithRedirect()}>
            Login
          </button>
        </>
      )}
    </>
  );
};

export default Login;

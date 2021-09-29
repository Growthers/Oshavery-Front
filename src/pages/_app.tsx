import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import ContextProvider from "../stores/ContextProvider";

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const redirectUrl = `${process.env["NEXT_PUBLIC_BASE_URL"] || ""}`;
  return (
    <Auth0Provider
      domain={`${process.env["NEXT_PUBLIC_AUTH0_DOMAIN"] || ""}`}
      clientId={`${process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"] || ""}`}
      redirectUri={redirectUrl}
    >
      <ContextProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} key={router.asPath} />
      </ContextProvider>
    </Auth0Provider>
  );
};
export default MyApp;

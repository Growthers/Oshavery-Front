import "../styles/global.scss";
import type { AppProps } from "next/app";
import ContextProvider from "../stores/ContextProvider";
import { UserProvider } from "@auth0/nextjs-auth0";
function MyApp({ Component, pageProps, router }: AppProps) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <ContextProvider>
        <Component {...pageProps} key={router.asPath} />
      </ContextProvider>
    </UserProvider>
  );
}
export default MyApp;

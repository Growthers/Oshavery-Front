import "../styles/global.scss"
import type { AppProps } from "next/app"
import ContextProvider from "../stores/ContextProvider"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} key={router.asPath} />
    </ContextProvider>
  )
}
export default MyApp

import '../styles/global.scss'
import type { AppProps } from 'next/app'
import ContextProvider from "../stores/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>

  )
}
export default MyApp

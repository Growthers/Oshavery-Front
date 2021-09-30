import type { FC, ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

import style from "../styles/components/Layout.module.scss";

const SiteName = "Oshavery";
const SiteImage = "https://media.oshavery-app.net/logos/ogp.png";

type Props = {
  pagetitle: string;
  description?: string;
  isheader: boolean;
  isfooter: boolean;
  children: ReactNode;
};

const Layout: FC<Props> = ({ pagetitle, children, isheader, isfooter, description = "Oshavery - A chat tool" }) => (
  <>
    <Head>
      <title>{pagetitle}</title>
      <meta httpEquiv="content-language" content="ja" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="name" content={pagetitle} />
      <meta name="image" content={SiteImage} />
      <meta name="description" content={description} />
      <meta property="og:title" content={pagetitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SiteImage} />
      <meta property="og:image:alt" content="Oshavery" />
      <meta property="og:site_name" content={SiteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pagetitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SiteImage} />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />{" "}
      {/* Windows8/10のスタート画面のピン留め画像に対応したい場合 */}
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <main className={style.main}>
      <div className={style.contents}>
        {isheader && (
          <div className={style.header}>
            <Header />
          </div>
        )}
        {children}
      </div>
      {isfooter && <Footer />}
    </main>
  </>
);

export default Layout;

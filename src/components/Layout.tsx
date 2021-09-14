import type { FC, ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";

const BaseURL = process.env.NEXT_PUBLIC_OSHAVERY_BASEURL || "";
const SiteName = "Oshavery";
const SiteImage = `https://${BaseURL}`;

type Props = {
  pagetitle: string;
  description?: string;
  isheader: boolean;
  isfooter: boolean;
  children: ReactNode;
};

const Layout: FC<Props> = ({ pagetitle, children, isheader, isfooter, description = "Oshavery - A chat tool" }) => {
  return (
    <>
      <Head>
        <title>{pagetitle}</title>
        <meta http-equiv="content-language" content="ja" />
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
      </Head>
      <main>
        {isheader && <Header />}
        {children}
      </main>
    </>
  );
};

export default Layout;

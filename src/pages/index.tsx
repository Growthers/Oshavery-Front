import type { NextPage } from "next"
import Link from "next/link"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href={"/guild/[guildID]"} as={"/guild/server_one"}>
        <a>サーバー1へ</a>
      </Link>
      <Link href={"/guild/[guildID]/channel/[channelID]"} as={"/guild/server_one/channel/a"}>
        <a>サーバー1へのチャンネルaへ</a>
      </Link>
    </div>
  )
}

export default Home

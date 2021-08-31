import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import ChannelList from '../components/organisms/ChannelList';



const Home: NextPage = () => {

  return (
        <div className={styles.container}>
          <ChannelList />
        </div>
  )
}

export default Home

import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { FC, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { client } from "../lib/client";


const Child: FC = () => {
  const { user } = useUser();

  useEffect(() => {
  },[])


  return (
    <h1>Loading</h1>
  );
};

const Loading: NextPage = () => {
  return (
    <div className={styles.container}>
      <Child />
    </div>
  );
};

export default Loading;

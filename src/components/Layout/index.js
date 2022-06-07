import React,{ useEffect,useState,useCallback } from "react";
import Head from 'next/head';
import Header from "../Header";
import Footer from "../Footer";
import { getAllDataByType } from "../../lib/cosmic";

import styles from "./Layout.module.sass";

const Layout = ({ children, title }) => {
  const [ navigation,setNavigation ] = useState( {} );

  const fetchNavigationData = useCallback( async () => {
    const navigationItems = await getAllDataByType( 'navigation' );
    await setNavigation( navigationItems[0]?.metadata);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if(!navigation.hasOwnProperty('menu') && isMounted) {
      fetchNavigationData();
    }

    return () => {
      isMounted = false;
    }
  },[fetchNavigationData, navigation]);


  return (
    <>
      <Head>
        <title>{title || 'Marketplace'}</title>
        <meta name="description" content="Marketplace with React.js Cosmic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header navigation={navigation}/>
        <main className={styles.inner}>
          {children}
        </main>
        <Footer navigation={navigation} />
      </div>
    </>
  );
};

export default Layout;

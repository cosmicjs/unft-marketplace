import React,{ useEffect,useState,useCallback } from "react";
import Head from 'next/head';
import Header from "../Header";
import Footer from "../Footer";
import { useStateContext } from '../../utils/context/StateContext';

import styles from "./Layout.module.sass";

const Layout = ({ children, title, navigationPaths }) => {
  const { navigation, setNavigation } = useStateContext();

  useEffect(() => {
    let isMounted = true;

    if(!navigation?.hasOwnProperty('menu') && navigationPaths?.hasOwnProperty('menu') && isMounted) {
      setNavigation(navigationPaths);
    }

    return () => {
      isMounted = false;
    }
  },[navigation, navigationPaths, setNavigation]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="Description" content="uNFT Marketplace with Cosmic CMS React Next.js Stripe" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title || 'Marketplace'}</title>
      </Head>
      <div className={styles.page}>
        <Header navigation={navigationPaths || navigation} />
        <main className={styles.inner}>
          {children}
        </main>
        <Footer navigation={navigationPaths || navigation} />
      </div>
    </>
  );
};

export default Layout;

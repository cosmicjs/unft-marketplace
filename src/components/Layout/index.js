import React,{ useEffect,useState,useCallback } from "react";
import Head from 'next/head';
import Header from "../Header";
import Footer from "../Footer";
import AppLink from "../AppLink";
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
        <meta name="description" content="uNFT Marketplace with Cosmic CMS React Next.js Stripe" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title || 'uNFT Marketplace'}</title>
      </Head>
      <AppLink className={styles.github} href="https://github.com/cosmicjs/unft-marketplace">
        <p className={styles.source}>The source code for this marketplace app is <span className={styles.github}>available on GitHub</span>.</p>
      </AppLink>
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

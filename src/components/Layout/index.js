import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import AppLink from '../AppLink'
import { useStateContext } from '../../utils/context/StateContext'

import styles from './Layout.module.sass'
import { Meta, PageMeta } from '../Meta'

const Layout = ({ children, title, navigationPaths }) => {
  const { navigation, setNavigation } = useStateContext()

  useEffect(() => {
    let isMounted = true

    if (
      !navigation?.hasOwnProperty('menu') &&
      navigationPaths?.hasOwnProperty('menu') &&
      isMounted
    ) {
      setNavigation(navigationPaths)
    }

    return () => {
      isMounted = false
    }
  }, [navigation, navigationPaths, setNavigation])

  return (
    <>
      <Meta />
      <PageMeta
        title={'uNFT Marketplace'}
        description={
          'uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API'
        }
      />
      <div className={styles.github}>
        <p className={styles.source}>
          The source code for this marketplace app is{' '}
          <span className={styles.github}>
            <a
              className={styles.github}
              href="https://github.com/cosmicjs/unft-marketplace"
              target="_parent"
            >
              available on GitHub
            </a>
          </span>
          .
        </p>
      </div>
      <div className={styles.page}>
        <Header navigation={navigationPaths || navigation} />
        <main className={styles.inner}>{children}</main>
        <Footer navigation={navigationPaths || navigation} />
      </div>
    </>
  )
}

export default Layout

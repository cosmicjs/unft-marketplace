import React from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import Image from 'next/image'
import chooseBySlug from '../utils/chooseBySlug'
import { getAllDataByType } from '../lib/cosmic'

import styles from '../styles/pages/NotFound.module.sass'
import { PageMeta } from '../components/Meta'

const AboutUs = ({ navigationItems, landing }) => {
  const { push } = useRouter()

  const handleClick = href => {
    push(href)
  }

  const infoAbout = chooseBySlug(landing, 'about')

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'About | uNFT Marketplace'}
        description={
          'uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API'
        }
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.heroWrapper}>
              <Image
                quality={60}
                layout="fill"
                src={infoAbout?.metadata?.image?.imgix_url}
                srcDark={infoAbout?.metadata?.image?.imgix_url}
                placeholder="blur"
                blurDataURL={`${infoAbout?.metadata?.image?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
                objectFit="cover"
                alt="Figures"
                priority
              />
            </div>
            <h2 className={cn('h2', styles.title)}>
              {infoAbout?.metadata?.title}
            </h2>
            <h3 className={styles.info}>{infoAbout?.metadata?.subtitle}</h3>
            <p className={styles.info}>{infoAbout?.metadata?.description}</p>
            <button
              onClick={() => handleClick(`/search`)}
              className={cn('button-stroke', styles.form)}
            >
              Start your search
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs

export async function getServerSideProps() {
  const navigationItems = (await getAllDataByType('navigation')) || []
  const landing = (await getAllDataByType('landings')) || []

  return {
    props: { navigationItems, landing },
  }
}

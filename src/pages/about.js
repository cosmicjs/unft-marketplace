import React from "react";
import { useRouter } from 'next/router';
import cn from "classnames";
import { useStateContext } from "../utils/context/StateContext";
import Layout from "../components/Layout";
import Image from "../components/Image";
import chooseBySlug from "../utils/chooseBySlug";
import { getAllDataByType } from '../lib/cosmic';

import styles from "../styles/pages/NotFound.module.sass";

const AboutUs = ({navigationItems, landing}) => {
  const { navigation } =  useStateContext();
  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  const landingAbout = chooseBySlug( landing,'marketing' );
  console.log( 'landingAbout',landingAbout );

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata || navigation }>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.preview}>
              <Image
                size={{ width: "100%", height: "50vh" }}
                src="/images/content/figures-dark.png"
                srcDark="/images/content/figures-dark.png"
                alt="Figures"
              />
            </div>
            <h2 className={cn("h2", styles.title)}>
              Sorry, we couldn’t find any results for this search.
            </h2>
            <div className={styles.info}>Maybe give one of these a try?</div>
              <button
                onClick={() => handleClick( `/search` )}
                className={cn( "button-stroke",styles.form )}>
                Start your search
              </button>
          </div>
        </div>
      </div>
  </Layout>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const navigationItems = await getAllDataByType( 'navigation' ) || [];
  const landing = await getAllDataByType('landings')  || [];

  return {
    props: { navigationItems, landing },
  }
}
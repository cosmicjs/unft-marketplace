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
  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  const infoAbout = chooseBySlug( landing,'about' );

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.preview}>
              <Image
                size={{ width: "100%", height: "50vh" }}
                src={infoAbout?.metadata?.image?.imgix_url}
                srcDark={infoAbout?.metadata?.image?.imgix_url}
                alt="Figures"
              />
            </div>
            <h2 className={cn("h2", styles.title)}>
              {infoAbout?.metadata?.title}
            </h2>
            <h3 className={styles.info}>{infoAbout?.metadata?.subtitle}</h3>
            <p className={styles.info}>
              {infoAbout?.metadata?.description}
            </p>
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

export async function getServerSideProps() {
  const navigationItems = await getAllDataByType( 'navigation' ) || [];
  const landing = await getAllDataByType('landings')  || [];

  return {
    props: { navigationItems, landing },
  }
}
import React from "react";
import { useRouter } from 'next/router';
import cn from "classnames";
import Layout from "../components/Layout";
import Image from "../components/Image";
import { ACTIVE_INDEX } from "../utils/constants/appConstants";

import styles from "../styles/pages/NotFound.module.sass";

const NotFound = () => {
  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  return (
    <Layout>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div className={styles.preview}>
              <Image
                srcSet="/images/content/figures.png 2x"
                srcSetDark="/images/content/figures.png 2x"
                src="/images/content/figures.png"
                srcDark="/images/content/figures-dark.png"
                alt="Figures"
              />
            </div>
            <h2 className={cn("h2", styles.title)}>
              Sorry, we couldn’t find any results for this search.
            </h2>
            <div className={styles.info}>Maybe give one of these a try?</div>
              <button
                onClick={() => handleClick( `/search/${ACTIVE_INDEX}` )}
                className={cn( "button-stroke",styles.form )}>
                Start your search
              </button>
          </div>
        </div>
      </div>
  </Layout>
  );
};

export default NotFound;

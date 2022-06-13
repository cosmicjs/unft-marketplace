import React from "react";
import { useRouter } from 'next/router';
import cn from "classnames";
import { useStateContext } from "../utils/context/StateContext";
import Layout from "../components/Layout";
import Image from "../components/Image";
import { ACTIVE_INDEX } from "../utils/constants/appConstants";

import styles from "../styles/pages/NotFound.module.sass";

const NotFound = () => {
  const { navigation } =  useStateContext();
  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  return (
    <Layout navigationPaths={navigation }>
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

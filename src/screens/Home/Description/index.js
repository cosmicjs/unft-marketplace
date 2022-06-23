import React from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import Image from "../../../components/Image";

import styles from "./Description.module.sass";

const Description = ( { info } ) => {
  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>{info?.metadata?.subtitle}</div>
          <h1 className={cn("h1", styles.title)}>
            {info?.metadata?.title}
          </h1>
          <div className={styles.text}>
            {info?.metadata?.description}
          </div>
          <div className={styles.btns}>
            <button
                aria-hidden="true"
                onClick={() => handleClick( `/search` )}
                className={cn( "button-stroke",styles.button )}>
                Discover more
              </button>
            <button
                aria-hidden="true"
                onClick={()=> handleClick ('/upload-details')}
                className={cn( "button",styles.button )}>
                Create item
              </button>
          </div>
        </div>
        <div className={styles.gallery}>
            <Image
              size={{width: '100%', height: '100vmin'}}
              className={styles.preview}
              src={info?.metadata?.image?.imgix_url}
              srcDark={info?.metadata?.image?.imgix_url}
              objectFit="contain"
              alt="Team"
            />
        </div>
      </div>
      </div>
  );
};

export default Description;

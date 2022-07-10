import React, { useState } from "react";
import cn from "classnames";
import AppLink from "../AppLink";
import Group from "./Group";
import Form from "../Form";
import Theme from "../Theme";
import Image from "../Image";
import SocialMedia from '../SocialMedia';

import styles from "./Footer.module.sass";

const Footers = ( { navigation } ) => {

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col} aria-hidden="true">
            <AppLink className={styles.logo} href="/">
              <Image
                size={{ width: "92px", height: "92px"}}
                className={styles.pic}
                src={navigation['logo']?.imgix_url}
                srcDark={navigation['logo']?.imgix_url}
                alt="Logo"
                objectFit="cntain"
              />
            </AppLink>
            <div className={styles.info}>The New Creative Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
              <Group className={styles.group} item={navigation?.['menu']} />
          </div>
          <div className={styles.col}>
            <AppLink
              href={`https://www.cosmicjs.com/features`}>
              <p className={styles.category}>
                About Cosmic
              </p>
            </AppLink>
            <AppLink
              href={`https://docs.cosmicjs.com/`}>
              <p className={styles.text}>
                Documentation
              </p>
            </AppLink>
            <AppLink
              href={`https://www.cosmicjs.com/contact`}>
              <p className={styles.text}>
                Contact Us
              </p>
            </AppLink>
            <SocialMedia className={styles.form} />
            <AppLink
              href={`https://cosmicjs.us5.list-manage.com/subscribe/post?u=15433aab34aefd5450c23fd94&id=028c29b6ca`}>
              <button
                aria-hidden="true"
                className={cn( "button",styles.button )}>
                Subscribe Newsletter
              </button>
            </AppLink>
          </div>
        </div>
      </div>
      <AppLink href={`https://www.cosmicjs.com`}>
          <div className={styles.copyright} aria-hidden="true">
            <p className={styles.powered}>
              Powered by{' '}
            </p>
              <Image
                className={styles.cosmic}
                size={{ width: "110px", height: "90px"}}
                src='/cosmic.svg'
                alt="Cosmic Logo"
                objectFit="contain"
              />
          </div>
        </AppLink>
    </footer>
  );
};

export default Footers;

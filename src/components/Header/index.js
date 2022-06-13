import React, { useState } from "react";
import cn from "classnames";
import AppLink from "../AppLink";
import Icon from "../Icon";
import Image from "../Image";
import User from "./User";
import {ACTIVE_INDEX} from "../../utils/constants/appConstants";

import styles from "./Header.module.sass";

const Headers = ({navigation, user}) => {
  const [ visibleNav, setVisibleNav ] = useState( false );
  console.log( 'user Header',user );

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)} aria-hidden="true">
        <AppLink className={styles.logo} href="/">
          <Image
            size={{ width: "128px", height: "60px" }}
            className={styles.pic}
            src={navigation['logo']?.imgix_url}
            srcDark={navigation['logo']?.imgix_url}
            alt="Logo"
          />
        </AppLink>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {navigation['menu']?.map((x, index) => (
              <AppLink
                aria-label="navigation"
                className={styles.link}
                href={x?.url || `/search/${ACTIVE_INDEX}` }
                key={index}
              >
                {x.title}
              </AppLink>
            ))}
          </nav>
        </div>
        <AppLink
          aria-label="search"
          aria-hidden="true"
          className={cn( "button-small",styles.button )}
          href={`/search/${ACTIVE_INDEX}`}
        >
          <Icon name="search" size="20" />
        </AppLink>
        {user?.['id'] && <User className={styles.user} user={user} />}
        <button
          aria-label="user-information"
          aria-hidden="true"
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        />
      </div>
    </header>
  );
};

export default Headers;

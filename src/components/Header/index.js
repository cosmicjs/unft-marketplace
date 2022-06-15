import React, { useState } from "react";
import cn from "classnames";
import AppLink from "../AppLink";
import Icon from "../Icon";
import Image from "../Image";
import User from "./User";
import Theme from "../Theme";
import Modal from "../Modal";
import OAuth from '../OAuth';
import { getCosmicUser } from '../../lib/cosmic';
import { useStateContext } from "../../utils/context/StateContext";

import styles from "./Header.module.sass";

const Headers = ({navigation}) => {
  const [visibleNav, setVisibleNav] = useState( false );
  const [visibleAuthModal, setVisibleAuthModal] = useState( false );

  const { cosmicUser, setCosmicUser, setAuthToken } = useStateContext();

  const handleOAuth = async ( token ) => {
    if( !token && !token?.hasOwnProperty('token') ) return;
    const userInfo = await getCosmicUser( token[ 'token' ] );
    await setCosmicUser( userInfo['user'] );
    setAuthToken( token[ 'token' ] );
  };


  return (
    <>
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
                href={x?.url || `/search` }
                key={index}
              >
                {x.title}
              </AppLink>
            ))}
          </nav>
        </div>
        <div className={styles.version}>
          <Theme className="theme-big" />
        </div>
        <AppLink
          aria-label="search"
          aria-hidden="true"
          className={cn( "button-small",styles.button )}
          href={`/search`}
        >
          <Icon name="search" size="20" />
          Search
        </AppLink>
        {cosmicUser?.[ 'id' ] ?
          <User className={styles.user} user={cosmicUser} /> :
          <button
          aria-label="login"
          aria-hidden="true"
          className={cn( "button-small",styles.button, styles.login )}
          onClick={() => setVisibleAuthModal(true)}
            >
            Login
        </button>
          }
        <button
          aria-label="user-information"
          aria-hidden="true"
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        />
      </div>
    </header>
    <Modal visible={visibleAuthModal} onClose={() => setVisibleAuthModal(false)}>
      <OAuth className={styles.steps} handleOAuth={handleOAuth} handleClose={() => setVisibleAuthModal(false)} />
    </Modal>
  </>
  );
};

export default Headers;

import React, { useState } from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import OutsideClickHandler from "react-outside-click-handler";
import Image from '../../Image';
import AppLink from '../../AppLink';
import styles from "./User.module.sass";
import Icon from "../../Icon";
import { removeToken } from '../../../utils/token';
import { useStateContext } from "../../../utils/context/StateContext";

const User = ( { className,user } ) => {
  const { setCosmicUser } = useStateContext();
  
  const [visible, setVisible] = useState(false);
  const {push} = useRouter();

  const items = [
  {
    title: "Disconnect",
    icon: "exit",
    callback: () => {
      setCosmicUser({});
      push('/');
      removeToken();
    },
  },
];

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
            <Image
              className={styles.avatar}
              size={{ width: "32px", height: "32px" }}
              src={user?.['avatar_url'] || "/images/content/avatar.png"}
              alt="Avatar"
              objectFit="cover"
              />
          <div className={styles.wallet}>
            {user?.['first_name'] || 'User'}
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith("http") ? (
                    <a
                      className={styles.item}
                      href={x.url}
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  ) : (
                    <AppLink
                      className={styles.item}
                      href={x.url || '/'}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </AppLink>
                  )
                ) : (
                  <div className={styles.item} key={index} onClick={x.callback}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;

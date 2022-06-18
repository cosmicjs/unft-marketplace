import React, { useState } from "react";
import AppLink from "../../AppLink";
import cn from "classnames";
import styles from "./Group.module.sass";
import Icon from "../../Icon";

const Group = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.group, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {item.title}
        <Icon name="arrow-bottom" size="10" />
      </div>
      <div className={styles.menu}>
        {item.menu.map((x, index) =>
          x.url.startsWith("http") ? (
            <AppLink
              href={x.url || '/'}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <p className={styles.link}>{x.title}</p>
            </AppLink>
          ) : (
            <AppLink href={x.url || '/'} key={index}>
              <p className={styles.link}>{x.title}</p>
            </AppLink>
          )
        )}
      </div>
    </div>
  );
};

export default Group;

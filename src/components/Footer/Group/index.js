import React, { useState } from "react";
import AppLink from "../../AppLink";
import cn from "classnames";
import Icon from "../../Icon";

import styles from "./Group.module.sass";

const Group = ({ className, item }) => {
  const [visible, setVisible] = useState( false );

  return (
    <div className={cn(className, styles.group, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {"Menu" || item[0]?.title}
        <Icon name="arrow-bottom" size="10" />
      </div>
      <div className={styles.menu}>
        {item?.map((x, index) =>
          <AppLink className={styles.link} href={x.url || '/'} key={index}>
            {x.title}
          </AppLink>
        )}
      </div>
    </div>
  );
};

export default Group;

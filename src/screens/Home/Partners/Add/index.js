import React, { useState } from "react";
import cn from "classnames";
import styles from "./Add.module.sass";
import Icon from "../../../../components/Icon";

const Add = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <button
      className={cn(className, styles.add, {
        [styles.active]: visible,
      })}
      onClick={() => setVisible(!visible)}
    >
      <Icon name="add-square" size="24" />
      <Icon name="minus-square" size="24" />
    </button>
  );
};

export default Add;

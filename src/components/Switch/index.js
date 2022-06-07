import React from "react";
import cn from "classnames";
import styles from "./Switch.module.sass";

const Switch = ({ className, value, setValue }) => {
  return (
    <label className={cn(styles.switch, className)}>
      <input
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
      <span className={styles.inner}>
        <span className={styles.box}></span>
      </span>
    </label>
  );
};

export default Switch;

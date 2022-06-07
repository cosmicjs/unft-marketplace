import React from "react";
import cn from "classnames";
import styles from "./LoaderCircle.module.sass";

const Loader = ({ className }) => {
  return <div className={cn(styles.loader, className)}></div>;
};

export default Loader;

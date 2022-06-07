import React from "react";
import cn from "classnames";
import styles from "./Form.module.sass";
import Icon from "../Icon";

const Form = ({
  className,
  onSubmit,
  placeholder,
  value,
  setValue,
  type,
  name,
}) => {
  return (
    <form className={cn(styles.form, className)} action="" onSubmit={onSubmit}>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
        required
      />
      <button className={styles.btn}>
        <Icon name="arrow-next" size="14" />
      </button>
    </form>
  );
};

export default Form;

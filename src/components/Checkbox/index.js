import React from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.sass'

const Checkbox = ({ className, content, value, onChange }) => {
  return (
    <label className={cn(styles.checkbox, className)}>
      <input
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <span className={styles.inner}>
        <span className={styles.tick}></span>
        <span className={styles.text}>{content}</span>
      </span>
    </label>
  )
}

export default Checkbox

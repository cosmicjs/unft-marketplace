import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Icon from '../../../components/Icon'

import styles from './FolowSteps.module.sass'

const FolowSteps = ({ className }) => {
  const { push } = useRouter()

  const handleGoHomePage = () => {
    push('/')
  }

  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn('h4', styles.title)}>Folow steps</div>
      <div className={styles.list}>
        <div className={cn(styles.item, styles.done)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Upload files</div>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <button
            onClick={handleGoHomePage}
            className={cn('button', styles.button)}
          >
            Start now
          </button>
        </div>
      </div>
    </div>
  )
}

export default FolowSteps

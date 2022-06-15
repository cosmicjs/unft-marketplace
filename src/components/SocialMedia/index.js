import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

import styles from './SocialMedia.module.sass';

const SocialMedia = () => {
  return (
    <div className={styles.social}>
      <FiFacebook className={styles.icon}/>
      <FiTwitter className={styles.icon}/>
      <FiInstagram className={styles.icon}/>
    </div>
  )
}

export default SocialMedia;
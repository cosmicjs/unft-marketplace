import React, {useState} from "react";
import cn from "classnames";
import { useRouter } from 'next/router';
import Image from "../../../components/Image";
import Modal from '../../../components/Modal';
import OAuth from '../../../components/OAuth';
import styles from "./Description.module.sass";
import {ACTIVE_INDEX} from "../../../utils/constants/appConstants";

const Description = ( { info } ) => {
  const [ visibleModal, setVisibleModal ] = useState( false );

  const { push } = useRouter();

  const handleClick = ( href ) => {
    push( href );
  }

  const handleCreate = () => {
    setVisibleModal( true );
  }

  return (
    <>
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>{info?.metadata?.subtitle}</div>
          <h1 className={cn("h1", styles.title)}>
            {info?.metadata?.title}
          </h1>
          <div className={styles.text}>
            {info?.metadata?.description}
          </div>
          <div className={styles.btns}>
              <button
                onClick={() => handleClick( `/search/${ACTIVE_INDEX}` )}
                className={cn( "button-stroke",styles.button )}>
                Discover more
              </button>
              <button
                onClick={handleCreate}
                className={cn( "button",styles.button )}>
                Create item
              </button>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet={info?.metadata?.image?.imgix_url}
              srcSetDark={info?.metadata?.image?.imgix_url}
              src={info?.metadata?.image?.imgix_url}
              srcDark={info?.metadata?.image?.imgix_url}
              alt="Team"
            />
          </div>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/cube@2x.png 2x"
              srcSetDark="/images/content/cube-dark@2x.png 2x"
              src="/images/content/cube.png"
              srcDark="/images/content/cube-dark.png"
              alt="Cube"
            />
          </div>
        </div>
      </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <OAuth className={styles.steps} handleClose={() => setVisibleModal(false)} />
      </Modal>
    </>
  );
};

export default Description;

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Modal.module.sass";
import Icon from "../Icon";

const Modal = ({
  outerClassName,
  containerClassName,
  visible,
  onClose,
  children,
} ) => {
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect( () => {
    if( typeof window === 'object' ) {
      document.addEventListener( "keydown",escFunction,false );
    };

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);


  return (typeof window !== 'undefined' && visible) ? (createPortal(
    (
      <div className={styles.modal}>
        <div className={cn(styles.outer, outerClassName)}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container, containerClassName)}>
              {children}
              <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="14" />
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    (typeof window === 'object') && document.body
  )) : null;
};

export default Modal;

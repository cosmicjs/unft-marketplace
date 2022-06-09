import React from "react";
import useDarkMode from "use-dark-mode";
import Skeletons from '../Skeletons';

const Image = ({ className, src, srcDark, alt }) => {
  const darkMode = useDarkMode(false);

  return (
  <>
      {!src?.length ?
        <Skeletons /> :
        <img
          className={className}
          src={( darkMode.value && srcDark ) ? srcDark : src}
          alt={alt}
        />
      }
  </>
  );
};

export default Image;

import React from "react";
import useDarkMode from "use-dark-mode";

const Image = ({ className, src, srcDark, alt }) => {
  const darkMode = useDarkMode(false);

  return (
    <img
      className={className}
      src={(darkMode.value && srcDark) ? srcDark : src}
      alt={alt}
    />
  );
};

export default Image;

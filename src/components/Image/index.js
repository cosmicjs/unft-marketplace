import React from "react";
import Image from 'next/image';
import useDarkMode from "use-dark-mode";

const ImageApp = ({ className, src, srcDark, alt, size, objectFit="contain" }) => {
  const darkMode = useDarkMode(false);

  return (
    <div className={className} style={{ ...size, position: 'relative' }}>
      <Image
        src={( darkMode.value && srcDark ) ? srcDark : src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        placeholder="blur"
        blurDataURL={`${src}?w=10`}
      />
  </div>
  );
};

export default ImageApp;

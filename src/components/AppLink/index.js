import Link from 'next/link';

/* This is necessary if you’re using libraries like styled-components. 
Without this, the <a> tag will not have the href attribute, 
which might hurt your site’s SEO.
https://nextjs.org/docs/api-reference/next/link */

function AppLink({ href, className, children }) {
  const hrefPath = href?.startsWith( "http" );

  return (
    <Link
      href={href}
      passHref
      aria-hidden="true"
      target={hrefPath ? "_blank" : "_self"}
      rel={hrefPath && "noopener noreferrer"}
    >
      <a target={hrefPath ? "_blank" : "_self"} className={className} aria-hidden="true">
        {children}
      </a>
    </Link>
  );
}

export default AppLink;

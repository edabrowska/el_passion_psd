import NextLink from 'next/link'

export default ({ href, children, ...props }) =>
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>

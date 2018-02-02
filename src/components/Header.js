import { withRouter } from 'next/router'

import Link from '~/components/Link'

const getLinkProps = (href, path) => ({
  href,
  style: {fontWeight: path === href ? 'bold' : 'regular'}
})

const Header = ({router}) =>
  <div>
    <Link {...getLinkProps('/', router.asPath)}>home</Link>
    <br />
    <Link {...getLinkProps('/about', router.asPath)}>about</Link>
  </div>

export default withRouter(Header)

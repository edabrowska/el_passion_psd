import { withRouter } from 'next/router'

import Link from '~/components/Link'
import Logo from '~/svg/logo.svg'

const getLinkProps = (href, path) => ({
  href,
  style: {fontWeight: path === href ? 'bold' : 'regular'}
})

const Header = ({router}) =>
  <div>
    <Link {...getLinkProps('/', router.asPath)}>
      <Logo width='180px' />
    </Link>
    <br />
    <Link {...getLinkProps('/about', router.asPath)}>about</Link>
  </div>

export default withRouter(Header)

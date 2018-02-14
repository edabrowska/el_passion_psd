import Link from '~/components/Link'
import Logo from '~/svg/logo.svg'

export default () =>
  <div>
    <Link href='/'>
      <Logo width='180px' />
    </Link>
    <br />
    <Link href='/about'>about</Link>
  </div>

import Link from '~/components/Link'
import Logo from '~/svg/logo.svg'

export default () =>
  <div className='container'>
    <Link href='/'>
      <Logo width='180px' />
    </Link>
    <br />
    <Link href='/about'>about</Link>
  </div>

import Header from '~/Header'

export default (WrappedComponent) => (props) =>
  <div>
    <Header />
    <WrappedComponent {...props} />
  </div>
